var express = require('express');
const sql = require('mssql');

var router = express.Router();

const config = {
  user: 'legajos',
  password: 'A1234b@@IUDU',
  server: 'cfhq002vw0665.cfcorp.ad\\inst1', // Change this to your SQL Server instance address
  database: 'LegajosDig',
  options: {
    encrypt: true, // Change to true if your SQL Server uses SSL
    trustServerCertificate: true, // Change to false if you have a valid CA for your SQL Server certificate
  },
};

// Endpoint to handle document number input and perform SQL query
router.get('/:documentNumber', async (req, res) => {
    const { documentNumber } = req.params;

    try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM tarjetas_cw WHERE documento = ${documentNumber}`;

      if (result.recordset.length > 0) {
        res.json(result.recordset);
      } else {
        res.status(404).json({ error: 'No results found.' });
      }
    } catch (error) {
      console.error('An error occurred while processing the request:', error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    } finally {
      sql.close();
    }
  });

module.exports = router;
