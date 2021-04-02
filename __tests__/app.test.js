const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Recipe = require('../lib/models/Recipe');
const twilio = require('../lib/utils/twilio');
jest.mock('../lib/utils/twilio');


jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let recipe; 

  beforeEach( async () => {
    recipe = await Recipe.insert({  title: 'bacon',
    ingredients: 'bacon stuff',
    thumbnail: "fsdas" });

    twilio.sendSms.mockReset();
  })
 

  it('adds new recipe to our DB and send text updating user', () => {
    return request(app)
        .post('/api/v1/recipes')
        .send({ 
          title: 'bacon',
          ingredients: 'bacon stuff',
          thumbnail: "fsdas"
      
      })
        .then((res) => {
          expect(twilio.sendSms).toHaveBeenCalledTimes(1);
          expect(res.body).toEqual({
          id: '2',
          title: 'bacon',
          ingredients: 'bacon stuff',
          thumbnail: null,
          })
      })
    })

  it('finds favorite recipes based on id', () => {
    return request(app)
      .get('/api/v1/recipes/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          title: 'bacon',
          ingredients: 'bacon stuff',
          thumbnail: null,
        })
      })
  })  
  
  it('updates a title in our database by ID', () => {
    return request(app)
      .put('/api/v1/recipes/1')
      .send({  
        title: 'pasta',
        })
      .then((res) => {
        expect(twilio.sendSms).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          title: 'pasta',
          ingredients: 'bacon stuff',
          thumbnail: null,
        });
      });
  });

  it('deletes a recipe from our favs by id', () => {
    return request(app)
    .delete('/api/v1/recipes/1')
    .then((res) => {
      expect(twilio.sendSms).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
          id: '1',
          title: 'bacon',
          ingredients: 'bacon stuff',
          thumbnail: null,
      })
    })
  })
  
  
  
});