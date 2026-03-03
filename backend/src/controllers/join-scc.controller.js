<<<<<<< HEAD:backend/src/controllers/joinscc.controller.js
import {
  createJoinScc,
  getAllJoinScc,
  deleteJoinScc,
} from "../services/joinScc.service.js";

/**
 * POST /join-sccs
 */
export const createJoinSccController = async (req, res) => {
  try {
    const result = await createJoinScc(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 * GET /join-sccs
 */
export const getAllJoinSccController = async (req, res) => {
  try {
    const result = await getAllJoinScc();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE /join-sccs/:id
 */
export const deleteJoinSccController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteJoinScc(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
=======
import{getJoinSCCServices as getJoinSCC, createJoinSCCServices as createJoinSCC, deleteJoinSCCServices as deleteJoinSCC}from"../services/join-scc.service.js";

 const getJoinSCCController=async(req,res)=>{
    try{const joinscc=await getJoinSCC();
        res.status(200).json(joinscc);
    }
    catch(error){res.status(500).json({message:error.message});
}
}
 const createJoinSCCController=async(req,res)=>{
    try{
        const joinscc=await createJoinSCC(req.body);
        res.status(201).json(joinscc);
    }
    catch(error){res.status(500).json({message:error.message});
}
}
 const deleteJoinSCCController=async(req,res)=>{
    try{
        const{id}=req.params;
        await deleteJoinSCC(id);
        res.status(204).send();
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

export default{
    getJoinSCC: getJoinSCCController,
    createJoinSCC: createJoinSCCController,
    deleteJoinSCC: deleteJoinSCCController
}
>>>>>>> cf3e1a90b3de206b5fd100cdba1eebb44f9df8d2:backend/src/controllers/join-scc.controller.js
