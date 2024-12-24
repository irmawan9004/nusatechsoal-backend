const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

// Update user information (email, password, and photo)

exports.updatePhoto = async (req, res) => {
  const userId = req.user.id;  // Assuming the user is authenticated and user ID is available
  
  try {
    // Log the user ID and check if the user exists
    console.log("User ID from request:", userId);
    
    let user = await User.findById(userId);
    
    console.log("User found:", user);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Handle file upload
    if (req.file) {
      console.log("File uploaded:", req.file);

      // File path for the uploaded image
      const filePath = path.join(__dirname, '../uploads', req.file.filename);
  
      // Optionally: If there’s an existing photo, you can delete the old one
      if (user.photo) {
        const oldPhotoPath = path.join(__dirname, '../uploads', user.photo);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath); // Delete the old photo file
        }
      }
  
      // Update the photo filename in the database (store only the filename)
      user.photo = req.file.filename;  // Save filename to the database
  
      await user.save();
      
      // Respond with success
      res.status(200).json({
        message: 'Photo updated successfully',
        photo: user.photo,  // Return the filename (or URL if necessary)
      });
    } else {
      return res.status(400).json({ error: 'No photo uploaded' });
    }
  } catch (error) {
    console.error(error);  // Log any errors
    res.status(400).json({ error: error.message });
  }
};



  exports.updateUsername = async (req, res) => {
    const userId = req.user.id;  // Assuming the user is authenticated and user ID is available
    const { username } = req.body;
  
    try {
      // Find the user by ID
      let user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the new email is different
      if (username && username !== user.username) {
        user.username = username;
        await user.save();
  
        return res.status(200).json({
          message: 'username updated successfully',
          username: user.username,
        });
      } else {
        return res.status(400).json({ error: 'Invalid username' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



  exports.updatePassword = async (req, res) => {
    const userId = req.user.id;  // Assuming the user is authenticated and user ID is available
    const { currentPassword, newPassword } = req.body;
  
    // Validation: Ensure newPassword is provided
    if (!newPassword) {
      return res.status(400).json({ error: 'New password is required' });
    }
  
    try {
      // Find the user by ID
      let user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // If currentPassword is empty, skip comparison (allow updating)
      if (currentPassword === "") {
        // Proceed directly with the new password update
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        user.password = hashedPassword;
        await user.save();
  
        return res.status(200).json({ message: 'Password updated successfully' });
      }
  
      // Check if the current password matches (only if it's not an empty string)
      const isMatch = await bcrypt.compare(currentPassword, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
  
      // Hash the new password and update
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
