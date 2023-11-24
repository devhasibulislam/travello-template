/**
 * Title: Write a program using JavaScript on Routes
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 15, November 2023
 */

import { BsCartPlus } from "react-icons/bs";
import { MdPlaylistAddCheck } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";

const routes = [
  {
    name: "Add Rent",
    path: "/dashboard/add-rent",
    icon: <BsCartPlus className="w-6 h-6" />,
  },
  {
    name: "List Rents",
    path: "/dashboard/list-rents",
    icon: <MdPlaylistAddCheck className="w-6 h-6" />,
  },
  {
    name: "List Users",
    path: "/dashboard/list-users",
    icon: <TbUsersGroup className="w-6 h-6" />,
  },
];

export default routes;
