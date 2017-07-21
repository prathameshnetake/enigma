var mongoose = require('mongoose')

var onlineUserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true,
		unique: true
	},
	time: {
		type: Date,
		default: Date.now()
	},
	sessionId: {
		type: String
	}
})

var User = module.exports = mongoose.model('OnlineUser', onlineUserSchema)

module.exports.createOnlineUser = function( newOnlineUser, callBack){
	newOnlineUser.save(callBack)
}
module.exports.removeOnlineUser = (username, callBack) => {
	User.findOne({username: username}, (err, user) => {
		if(err){
			throw err
		}
		user.remove(callBack)
	})
}
