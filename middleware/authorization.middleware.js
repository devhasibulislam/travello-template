/**
 * Title: Write a program using JavaScript on Authorization Middleware
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https:/instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 21, November 2023
 */

const authorization = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!role.includes(userRole)) {
      return res.send({
        success: false,
        message: "You are not authorized to access this feature",
      });
    }
    next();
  };
};

export default authorization;
