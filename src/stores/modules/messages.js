const state = {
	messageGroup: {
		// messageClass: 'danger',
		// message: 'Test'
		messageClass: '',
		message: '',
		timeoutEvent: null,
	}
}

const mutations = {
	'ADD_MESSAGE' (state, {message, messageClass}) {
		state.messageGroup = {
			messageClass,
			message
		}

		if (state.timeoutEvent) {
			clearTimeout(state.timeoutEvent);
		}
		state.timeoutEvent = setTimeout(function() {
			state.messageGroup = {
				messageClass: '',
				message: ''
			}
		}, 5000);
	},
	'CLEAR_MESSAGE' (state) {
		state.messageGroup = {
			messageClass: '',
			message: ''
		}
	}
}

const actions = {
	// Don't need action for now
	addMessage({commit}, obj) {
		commit('ADD_MESSAGE', obj);
	},
	clearMessage({commit}) {
		commit('CLEAR_MESSAGE');
	}
}

const getters = {
	messages: (state) => {
		return state.messageGroup;
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}
