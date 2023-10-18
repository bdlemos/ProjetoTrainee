import { app } from "./config/expressConfig";

app.listen(process.env.PORT, () =>{
	console.log('Servidor hosteado na porta' + process.env.PORT);
})