const sendEmail = require('../middleware/mailer');

exports.Send = async (req, res) => {
  try {
    const { email, fullName, subject, phone, message } = req.body;
    
    const result = await sendEmail(email, fullName, subject, phone, message);
    
    res.status(200).json({ 
      success: true, 
      message: "Message sent successfully" 
    });
    
  } catch (error) {
    console.error("Error in Send controller:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Failed to send message" 
    });
  }
};