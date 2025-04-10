const express = require('express');
const server = express();
require('dotenv').config();




console.log("FRONTEND_ORIGIN:", process.env.FRONTEND_ORIGIN);






const cors = require('cors');
server.use(cors({

    origin: process.env.FRONTEND_ORIGIN,
    credentials: true

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
port:process.env.PG_PORT,
ssl: {
    rejectUnauthorized: false // for RDS without client certs
  }


})








// 1) Create reusable instances :
const embeddings = new OpenAIEmbeddings();
const model = new ChatOpenAI({ model: "gpt-4" });

// 2) Then define route:
server.post("/makeQuery", async (req, res) => {
  try {
    const { association_id, query: question } = req.body;

    // 1) Embed the user's question
    const embeddingOfQuery = await embeddings.embedQuery(question);

    // 2) Retrieve the closest embeddings from Postgres
    const closestEmbeddings = await pool.query(
      `SELECT metadata
       FROM document_vectors
       WHERE association_id = $2
       ORDER BY embedding <-> $1
       LIMIT 5;`,
      [JSON.stringify(embeddingOfQuery), association_id]
    );

    // 3) Combine the text from those embeddings
    const contentOfClosestEmbeddings = closestEmbeddings.rows.map(
      (row) => row.metadata.content
    );
    const contentOfClosestEmbeddingsString = contentOfClosestEmbeddings.join(
      "***->Next Rule: "
    );

    // 4) Prepare the prompt
    const systemMessage = `You are a help desk assistant for a homeowners association (HOA)...
      ... <rest of system instructions unchanged> ...`;

    const userMessage = `Help answer the following resident question based strictly on the provided context.

    ###Question: {question}

    ### context: {context}`;

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemMessage],
      ["user", userMessage],
    ]);

    const queryToSend = await promptTemplate.invoke({
      question,
      context: contentOfClosestEmbeddingsString,
    });

    // 5) Call OpenAI using the already-instantiated model
    const answer = await model.invoke(queryToSend);

    // 6) Return the response to the client
    res.status(200).json({ message: answer.content });
  } catch (error) {
    console.error("Error in /makeQuery route:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

    
    







// doc update


server.post("/sendPdf",upload.array("pdf"),async(req,res)=>{



    const association_id = req.body.association_id;

    const files = req.files;
    //console.log(files);
    

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

























    








const port = process.env.PORT || 3000;


server.listen(port,()=>{





    console.log("on...");
})
