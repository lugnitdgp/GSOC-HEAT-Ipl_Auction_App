import Player from "../models/playerModel.js";
import User from "../models/userModel.js";
const playerController = async (req, res) => {
    let data;
    let getPlayers = req.params.val ;
    

    if(getPlayers == "Running"){
        data = await Player.find({is_auc_running: true});
    }else if(getPlayers == "Sold"){
        data = await Player.find({curr_status: "sold",is_auc_running: false});
    }else if(getPlayers == "Unsold"){
        data = await Player.find({curr_status: "unsold"});
    }else if(getPlayers == "All"){
        data = await Player.find({});
    }

   

    if (data) {
        //console.log(data);
        res.status(201).json(data);
    } else {
        res.status(400);
        throw new Error("player not found");
    }
};
const playerUpdater = async (req, res) => {
    const { id, price, userId, userName, prevUserId } = req.body;

    const data = await Player.findByIdAndUpdate(id, {
        current_price: price,
        curr_status: "sold",
        curr_owner: userName,
        is_auc_running: true,
    });
    // const user = await User.findById(userId);
    // const prevUser = await User.findOne({ name: prevUserId });

    // const newBoughtArr = user.playersBought;
    // if (!newBoughtArr.includes(id)) {
    //     newBoughtArr.push(id);
    // }
    // console.log(newBoughtArr);
    // await User.findByIdAndUpdate(userId, {
    //     playersBought: newBoughtArr,
    // });

    // const updatedArr = prevUser.playersBought;
    // if (updatedArr.includes(id)) {
    //     updatedArr.splice(updatedArr.indexOf(id), 1);
    // }

    if (data) {
        res.status(201).json(data);
    } else {
        res.status(400);
        throw new Error("player not found");
    }
};

const addPlayer = async (req, res) => {
    const { name, current_price } = req.body;
    const player = await Player.create({
        name,
        current_price,
    });
    if (player) {
        res.status(201).json(player);
    } else {
        res.status(400);
        throw new Error("player not found");
    }
};
const getPlayer = async (req, res) => {
    const player = await Player.findById(req.params.id);
    console.log(player);
    if (player) res.status(201).json(player);
    else throw new Error("Player not found");
};

const updateTime = async (id, time, runningStat) => {
    if (time) {
        await Player.findByIdAndUpdate(id, {
            expires_on: time,
            is_auc_running: true,
        });
    } else {
        await Player.findByIdAndUpdate(id, {
            is_auc_running: false,
        });
    }
};

export { playerController, playerUpdater, addPlayer, getPlayer, updateTime };
