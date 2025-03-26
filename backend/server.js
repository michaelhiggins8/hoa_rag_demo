const express = require('express');
const server = express();
const dotenv = require('dotenv');

dotenv.config();
const cors = require('cors');
server.use(cors({

origin: process.env.FRONTEND_ORIGIN,
credentials:true

}));

const morgan = require('morgan');
server.use(morgan('dev'));
server.use(express.json());


const { OpenAIEmbeddings } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { ChatOpenAI } =  require("@langchain/openai");

const fs = require("fs");
const pdfParse = require("pdf-parse");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { Document } = require('@langchain/core/documents');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });














const {Pool} = require('pg');


const pool = new Pool({


user:process.env.PG_USER,
host:process.env.PG_HOST,
database:process.env.PG_DATABASE,
password:process.env.PG_PASSWORD,
port:process.env.PG_PORT


})














// makeQuery

server.post("/makeQuery",async(req,res)=>{

    const association_id = req.body.association_id
   





    // get similar rules
    
        // convert query to embedding 
            const question = req.body.query;
    
    
            const embeddings = new OpenAIEmbeddings();
            const embeddingOfQuery =  await embeddings.embedQuery(question);
    
    
    
    
    
        // find closest embedding to query
        
            const clostEmbeddings = await pool.query(`SELECT metadata FROM document_vectors WHERE association_id = $2 ORDER BY embedding <-> $1 LIMIT 5;`,[JSON.stringify(embeddingOfQuery),association_id]);
            const contentofClosestEmbeddings = clostEmbeddings.rows.map(item => item.metadata.content)
            const contentofClosestEmbeddingsString = contentofClosestEmbeddings.join("***->Next Rule: ");
    
    // send querry + rules to openai
    
    
    
        // create message
    
    
            const systemMessage = `You are a help desk assistant for a homeowners association (HOA). Your role is to answer resident questions about HOA rules with clarity, accuracy, and neutrality. Use a formal yet approachable tone, ensuring all residents can easily understand your responses. Base your responses strictly on the provided HOA rules. If the rules do not specify a restriction, state that explicitly and note that local laws or policies may apply. Do not assume legality unless clearly stated in the HOA documents or legal sources. Your responses must begin with one of the following labels: 'Likely Allowed', 'Likely Not Allowed', 'Likely Partially Allowed', or 'Unclear'. If a rule is vague or open to interpretation, outline possible viewpoints and suggest checking with the HOA board for clarification. If the matter is commonly regulated elsewhere (e.g., property modifications, pet restrictions, short-term rentals), note that other local laws or policies may apply. Do not assume legality unless clearly stated in the HOA documents or legal sources. Maintain strict neutrality. Do not offer personal opinions, interpretations, or workarounds. Focus only on the provided HOA rules and legal considerations, avoiding emotional or subjective language. If a question involves **a serious crime (e.g., human trafficking, violent acts, major fraud)**, do not attempt to assess its legality. Instead, state that criminal matters fall outside the HOA's authority and recommend contacting law enforcement or legal professionals for guidance. If a rule requires HOA approval (e.g., board approval, variances, or permits), specify that the action may be conditionally allowed and direct the user to proper channels for approval.`
    
            const userMessage = `Help answer the following resident question based strictly on the provided context.
    
            ###Question: {question}
    
            ### context: {context}`
    
            const promptTemplate = ChatPromptTemplate.fromMessages([
                ["system", systemMessage],
                ["user", userMessage],
            ]);
        
        // query message + get answer
            const queryToSend = await promptTemplate.invoke({question: question, context: contentofClosestEmbeddingsString });
    
    
    
    
    
    
    // retrun answer from open ai
        const model = new ChatOpenAI({ model: "gpt-4" });
        const answer = await model.invoke(queryToSend);
        res.status(200).json({"message":answer.content});
    
    
    
    
    
    
    
    
    
    
    
    })
    
    
    
    
    
    
    







// doc update


server.post("/sendPdf",upload.array("pdf"),async(req,res)=>{



    const association_id = req.body.association_id;

    const files = req.files;
    console.log(files);
    

    // create array of objexts with file compute content
    const contents = []
    
    for(let i = 0; i< files.length;i++){


        contents.push({
            
            
            "originalname":files[i].originalname,
            
            "buffer":fs.readFileSync(files[i].path)
        
        }
        
        );
        console.log("ON:",files[i].originalname);

    
    }




    // create array of ojexts with file TEXT content


    let contentsTxt = []
for (let i = 0; i<contents.length;i++){



    
    let holder = await pdfParse(contents[i].buffer);
    contentsTxt.push({
        
        
       "originalname":  contents[i].originalname,
        
        
        "txt": holder.text});
        




}



// CHUNK into "document" object of chunks with meta data attribute

const docs = contentsTxt.map(content => new Document({
    pageContent: content.txt, 
    metadata: { filename: content.originalname } 
}));




const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const allSplits = await splitter.splitDocuments(docs);
  console.log("ONEONEONE")
  console.log("allSplits: ",allSplits);

  console.log("TWOTWOTWO")




//convert chunks into array of objects with Embeddings



  const embeddingsModel = new OpenAIEmbeddings();






  const embeddingsContainer = [];

for (let i = 0; i <allSplits.length;i++){


    const embedding = await embeddingsModel.embedQuery(allSplits[i].pageContent);
       

    embeddingsContainer.push({

        "finalEmbedding":embedding,
        "originalname": allSplits[i].metadata.filename,
        "currentContent":allSplits[i].pageContent
    
    })

}


console.log("THREETHREETHREE")

console.log(embeddingsContainer);


console.log("FOURFOURFOUR")

 
  

const client = await pool.connect();
  
try {
  
  await client.query('BEGIN');

  //start logic space



/* 
  const response =  await client.query(`INSERT INTO documents(association_id,file_name,file_path) VALUES ($1,$2,$3) RETURNING id`,[association_id,embeddingsContainer[0].originalname,'n/a'])
 

  console.log("4.1")
  const insertedId = response.rows[0].id;
   */
  console.log("4.2")
  console.log("FIVEFIVEFIVE")
  console.log("SIXSIXSIX")


  for(let i = 0;i<embeddingsContainer.length;i++){

 const response =  await client.query(
    `INSERT INTO document_vectors(association_id,embedding,metadata) VALUES ($1,$2,$3)`,
    [association_id, "["+embeddingsContainer[i].finalEmbedding.join(",")+ "]",JSON.stringify({content: embeddingsContainer[i].currentContent})])
    console.log("SEVENSEVENSEVEN")

    console.log("emb:",embeddingsContainer[i].finalEmbedding);
    console.log("EIGHTEIGHTEIGHT")


  }



  //end logic space

await client.query('COMMIT');
} catch (err) {
  
  await client.query('ROLLBACK');
  console.error('Error processing data', err);
} finally {
  
  client.release();
}

console.log("done")












    




})

























    










server.listen(3000,(req,res)=>{





    console.log("on...");
})