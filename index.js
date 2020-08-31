import * as shop from "./shop.js";
import { localIcon } from "./gui-toolkit.js";
import { executeCommand } from "ez:command";
import { updateBalance } from "ez:economy";
import { registerGuiCommand } from "./gui.js";
import { makeCategoryForm } from "./gui-common.js";
const shopmod = shop.buildShopModule({
    title: "shop的标题",
    content: "shop的内容",
    categories: [{
            name: "建筑",
            text: "建筑方块",
            image: localIcon("textures/ui/icon_recipe_construction"),
            title: "肝帝的最爱",
            content: "各种建筑方块",
        }, {
            name: "装饰",
            text: "装饰物品",
            image: localIcon("textures/ui/icon_recipe_equipment"),
            title: "收集党的最爱",
            content: "各种小玩意",
        }],
    items: [{
            categoryName: "建筑",
            text: "蓝冰",
            image: localIcon("textures/blocks/blue_ice"),
            desc: "blue_ice",
            cost: 25,
        }, {
            categoryName: "建筑",
            text: "木头2",
            image: localIcon("textures/blocks/crimson_planks"),
            desc: "crimson_planks",
            cost: 10,
        }],
    template: {
        title: "数量确认",
        slideText: "滑块文本",
        confirmTitle: "确认购买标题",
        getConfirmText(name, text, price, count) {
            return `名字: ${name} 显示文本: ${text} 价格: ${price} 数量: ${count} 合计: ${price * count}`;
        },
        button1: "确认购买",
        button2: "放弃购买"
    },
    getInterface(player) {
        return {
            execute(desc, price, count) {
                updateBalance(player, -price * count, "购买商品");
                executeCommand(`/give "${player.name}" ${desc} ${count}`);
            },
            sendSuccessMessage(desc) {
                executeCommand(`/tell "${player.name}" 购买 ${desc} 成功`);
            },
            sendCancelMessage(desc) {
                executeCommand(`/tell "${player.name}" 购买 ${desc} 失败`);
            },
            getMax(desc) {
                return 64;
            }
        };
    }
});
registerGuiCommand({
    command: {
        name: "gui",
        desc: "commands.gui.description",
        response: "打开完毕",
    },
    ui: makeCategoryForm({
        title: "标题",
        content: "内容",
        modules: [{
                text: "购物",
                image: localIcon("textures/ui/MCoin"),
                generate: shopmod
            }]
    })
});
