import { BiBuildings } from "react-icons/bi";
import {
  TbBuildingBank,
  TbBuildingCastle,
  TbBuildingChurch,
} from "react-icons/tb";
import { BsBuildingAdd } from "react-icons/bs";
import { PiBuildings } from "react-icons/pi";
import { LuSailboat } from "react-icons/lu";
import { GiWoodCabin } from "react-icons/gi";
import { AiOutlineBuild } from "react-icons/ai";

const hotelTypes = [
  { name: "House", icon: <BsBuildingAdd /> },
  { name: "Apartment", icon: <PiBuildings /> },
  { name: "Barn", icon: <TbBuildingBank /> },
  { name: "Bed & Breakfast", icon: <TbBuildingCastle /> },
  { name: "Boat", icon: <LuSailboat /> },
  { name: "Cabin", icon: <GiWoodCabin /> },
  { name: "Camper/RV", icon: <AiOutlineBuild /> },
  { name: "Casa Particular", icon: <BiBuildings /> },
  { name: "Castle", icon: <BsBuildingAdd /> },
  { name: "Cave", icon: <PiBuildings /> },
  { name: "Container", icon: <TbBuildingBank /> },
  { name: "Cycladic Home", icon: <TbBuildingCastle /> },
  { name: "Dammuso", icon: <LuSailboat /> },
  { name: "Dome", icon: <GiWoodCabin /> },
  { name: "Earth Home", icon: <AiOutlineBuild /> },
  { name: "Farm", icon: <BiBuildings /> },
  { name: "Guesthouse", icon: <BsBuildingAdd /> },
  { name: "Hotel", icon: <PiBuildings /> },
  { name: "Houseboat", icon: <TbBuildingBank /> },
  { name: "Kezhan", icon: <TbBuildingCastle /> },
  { name: "Minsu", icon: <LuSailboat /> },
  { name: "Riad", icon: <GiWoodCabin /> },
  { name: "Ryokan", icon: <AiOutlineBuild /> },
  { name: "Sepherd's Hut", icon: <BiBuildings /> },
  { name: "Tent", icon: <PiBuildings /> },
  { name: "Tiny Home", icon: <TbBuildingBank /> },
  { name: "Tower", icon: <TbBuildingCastle /> },
  { name: "Treehouse", icon: <LuSailboat /> },
  { name: "Trullo", icon: <GiWoodCabin /> },
  { name: "Windmill", icon: <AiOutlineBuild /> },
  { name: "Yurt", icon: <BiBuildings /> },
];

export default hotelTypes;
