import cron from 'node-cron';
import { exportPostsToPDF, exportPostsToExcel  } from '../services/exportServices.js';

cron.schedule('*/1 * * * *', async () => {
  try{
    console.log('Starting export of posts...'); 

    const pdfPath = await exportPostsToPDF();
    const excelPath = await exportPostsToExcel();

    console.log(`Posts exported to PDF at: ${pdfPath}`);
    console.log(`Posts exported to Excel at: ${excelPath}`);
  } catch (error) {
    console.error("Export Failed", error);
  }
});