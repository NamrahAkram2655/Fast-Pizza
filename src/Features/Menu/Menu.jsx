import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../API/getMenu"
import MenuItems from "./MenuItems";

const Menu = () => {

    const menu = useLoaderData();

    return (
        <div className="divide-y divide-stone-400 px-2">
            {menu.map((pizza) => (
                <MenuItems pizza={pizza} key={pizza.id} />
            ))}
        </div>
    )
}

export async function menuloader() {
    const menu = await getMenu();
    return menu;
}

export default Menu
