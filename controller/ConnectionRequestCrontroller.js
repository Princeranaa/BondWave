const ConnectionRequest = require("../model/Connection_model");
exports.conncetionRequest = async (req,res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        // created a new object for the data 
        const connectionRequest = new ConnectionRequest({fromUserId,toUserId,status})
        
        // save the data into the database
        const data = await connectionRequest.save()
        res.status(200).json({
            message: 'Connection request sent successfully',
            data
        })
    } catch (error) {
     res.status(400).json({message: error.message});
    }
}