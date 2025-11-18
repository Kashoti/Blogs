import fs from 'fs';
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import Post from '../models/Post.js';


// Exporting posts to PDF
export const exportPostsToPDF = async () => {
  const posts = await Post.find();
  const doc = new PDFDocument();
  const filePath = `exports/posts_${Date.now()}.pdf`;
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  doc.fontSize(25).text('Blog Posts', { align: 'center', underline: true  });
  doc.moveDown();

  posts.forEach( (post) => {
    doc.fontSize(14).text(`title: ${post.title}`);
    doc.text(`Content: ${post.content}`);
    doc.text(`Author: ${post.author}`);
    doc.text(`Date: ${post.date}`);
    doc.moveDown();
  });

  doc.end();
  return filePath
};

//Export posts to Excell
export const exportPostsToExcel = async () => {
  const posts = await Post.find();
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Posts");

  sheet.columns = [
    { header: 'Title', key: 'title', width: 30 },
    { header: 'Content', key: 'content', width: 50 },
    { header: 'Author', key: 'author', width: 25 },
    { header: 'Date', key: 'date', width: 20 },
  ];

  posts.forEach( (post) => {
    sheet.addRow({
      title: post.title,
      content: post.content,
      author: post.author,
      date: post.date,
    }); 
  });

  const filePath = `exports/posts_${Date.now()}.xlsx`;
  await workbook.xlsx.writeFile(filePath);
  return filePath;

};
