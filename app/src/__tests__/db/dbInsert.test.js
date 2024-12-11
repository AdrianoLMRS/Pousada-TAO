/*

  TODO: Make a mongoDB test to insert some data into the database

*/

  // Use the following snippet as a starting point:
  // const client = await MongoClient.connect('mongodb://localhost:27017', {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });

  // const db = client.db('Hostel'); // Substitua pelo nome do seu banco de dados
  // const collection = db.collection('Cache'); // Substitua pelo nome da sua collection

  // const doc = {
  //   // O documento que será inserido
  // };

  // const result = await collection.insertOne(doc);

  // console.log(`Document inserted with _id: ${result.insertedId}`);

  // await client.close(); // Fechar a conexão com o banco de dados
  // console.log('Connection closed');
// };
// const { client } = require('../../db/index'); // Importa o cliente de conexão
// const { ObjectId } = require('mongodb'); // Opcional, se precisar usar ObjectId

// const insertDocument = async () => {
//   try {
//     // Conectar ao banco de dados
//     await client.connect();

//     // Acessar o banco de dados e a collection desejada
//     const db = client.db('Hostel'); // Substitua pelo nome do seu banco de dados
//     const collection = db.collection('Cache'); // Substitua pelo nome da sua collection

//     // O documento que será inserido
//     const doc = {
//       checkinDate: new Date('2024-12-01T14:00:00Z'), // Data de check-in
//       checkoutDate: new Date('2024-12-07T10:00:00Z'), // Data de check-out
//       adults: 2, // Número de adultos
//       children: 1, // Número de crianças
//       sessionId: 'abc123xyz', // ID da sessão
//       status: 'incomplete', // Status (padrão: 'incomplete')
//       createdAt: new Date(), // Data de criação
//     };

//     // Inserir o documento na collection
//     const result = await collection.insertOne(doc);

//     console.log(`Document inserted with _id: ${result.insertedId}`);
//   } catch (error) {
//     console.error('Error inserting document:', error);
//   } finally {
//     // Fechar a conexão com o banco de dados
//     await client.close();
//   }
// };

// // Chama a função para realizar o insert
// insertDocument();