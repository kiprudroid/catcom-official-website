//import {getLeader , createLeader ,deleteLeader} from "../services/leaders.service"
import { getLeadersServices as getLeader, createLeadersServices as createLeader, deleteLeadersServices as deleteLeader } from "../services/leaders.service.js";

const getLeaderController = async(req , res) =>{
try {
     const leaders = await getLeader() ;
     res.json(leaders);
     
     
}catch (error) {
    res.status(500).json({message : "Server Error : " + error.message} ) ;  
    
}
}

const createLeaderController = async(req,res) => {
try {
    const leader = await createLeader(req.body);
    res.status(201).json(leader);
} catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
}
}

const deleteLeaderController = async(req,res) => {
try {
    const {id} = req.params;
    await deleteLeader(id);
    res.status(204).end();
} catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
}
}

export default {
    getLeader: getLeaderController,
    createLeader: createLeaderController,
    deleteLeader: deleteLeaderController
};
