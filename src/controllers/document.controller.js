const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getDocumentByQr = async (req, res) => {
  try {
    const { qrcode } = req.params;
    const doc = await prisma.document.findUnique({ where: { qrcode } });

    if (!doc) return res.status(404).json({ error: "Document not found" });

    const updated = await prisma.document.update({
      where: { qrcode },
      data: { scanCount: { increment: 1 }, updatedAt: new Date() }
    });

  res.json(JSON.parse(JSON.stringify(updated, (key, value) => typeof value === 'bigint' ? value.toString() : value)));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDocument = async (req, res) => {
  try {
    const { title, description, qrcode, filePath } = req.body;
    const doc = await prisma.document.create({
      data: { title, description, qrcode, filePath }
    });
  res.json(JSON.parse(JSON.stringify(doc, (key, value) => typeof value === 'bigint' ? value.toString() : value)));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, qrcode, filePath } = req.body;

    const updated = await prisma.document.update({
      where: { id: BigInt(id) },
      data: { title, description, qrcode, filePath, updatedAt: new Date() }
    });

  res.json(JSON.parse(JSON.stringify(updated, (key, value) => typeof value === 'bigint' ? value.toString() : value)));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.document.delete({ where: { id: BigInt(id) } });
  res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllDocuments = async (req, res) => {
  try {
    const docs = await prisma.document.findMany({ orderBy: { createdAt: "desc" } });
  res.json(JSON.parse(JSON.stringify(docs, (key, value) => typeof value === 'bigint' ? value.toString() : value)));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
