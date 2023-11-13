const { NotFoundError, NotAuthorizedError } = require('../errors');
const userModel = require('../models/User');
const userService = require('./UserService');
const senhaService = require('./SenhaService');
const bcrypt = require('bcrypt');

// aqui temos os mocks
jest.mock("../models/User");
jest.mock("./SenhaService");
jest.mock('bcrypt');

describe('getUserById', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	test(
		'o método recebe o id de um usuário ==> busca o usuário com o id informado', () =>{
				// teste aqui
		}

}
