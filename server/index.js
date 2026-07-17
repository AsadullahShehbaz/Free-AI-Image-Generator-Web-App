import express from 'express';
import cors from "cors"
import "dotenv/config"

const app = express();

app.use(cors())
app.use(express.json())

const ACCOUNT_ID = process.env.ACCOUNT_ID;
const API_TOKEN = process.env.API_TOKEN;

const MODEL = "@cf/black-forest-labs/flux-2-klein-9b"

app.post('/generate-image', async (req, res) => {
  const {prompt} = req.body;
  if(!prompt){
    return res.status(400).json({
        error:"Prompt is required"
    })
  }

  try{
    const form = new FormData();
    form.append('prompt', prompt);

    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
        {
            method:"POST",
            headers:{
                Authorization: `Bearer ${API_TOKEN}`
            },
            body: form
        }

    )
    if(!response.ok){
        const detail = await response.text()
        console.error("Cloudflare error:",detail)
        return res.status(500).json({
            error:"Cloudflare API request failed"
        })
    }

    const data = await response.json()
    res.json({
        image:  data.result.image
    })
  }
  catch(err){
    console.error(err);
    res.status(500).json({
        error:"Server error while generating image"
    })
  }
});

const PORT = 3001

app.listen(PORT , () => {
  console.log(`Backend listening on port ${PORT}`);
});