/* eslint-disable no-undef */

const onlyUser = {username: 'duyvip', password: '63c1796f4ec84aaeda47204e', name: 'Duy Le'}
const initialBlogs = [
  {
    title: "Binh's AOE",
    author: "Binh Nguyen",
    url: "nothing",
    likes: 10,
  },
  {
      title: "Duy's success",
      author: "Duy Le",
      url: "nothing",
      likes: 4,
  }
]

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.register(onlyUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(onlyUser.username)
      cy.get('#password').type(onlyUser.password)
      cy.contains('login').click()
      cy.contains(`logged in as ${onlyUser.name}`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(onlyUser.username)
      cy.get('#password').type("wrongpasswordhere")
      cy.contains('login').click()
      cy.contains('ERROR: wrong credentials')

      cy.get('html').should('not.contain', `logged in as ${onlyUser.name}`)
    })
  })

  describe('Logged in', function() {
    beforeEach(function() {
      cy.login(onlyUser)
      cy.createBlogs(initialBlogs)
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type("this is a blog title.")
      cy.get('#author').type("this is a blog author.")
      cy.get('#url').type("this is a blog url.")
      cy.contains('submit').click()
      cy.contains("this is a blog title. this is a blog author.")
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
    })

    it('A blog can be removed', function() {
      cy.contains(`${initialBlogs[0].title} ${initialBlogs[0].author}`)

      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('html').should('not.contain', `${initialBlogs[0].title} ${initialBlogs[0].author}`)
    })

    it('Blog are arranged based on likes', function() {
      cy.createBlogs([{title: "Most Like for obvious reason", author: "Dan", url: "nothing", likes: 69420}])

      cy.get('.blog').eq(0).should('contain', 'Most Like for obvious reason')
      cy.get('.blog').eq(1).should('contain', "Binh's AOE")
      cy.get('.blog').eq(2).should('contain', "Duy's success")

      cy.createBlogs([{title: "Least Like for obvious reason", author: "noname", url: "nothing", likes: -666}])

      cy.get('.blog').eq(0).should('contain', 'Most Like for obvious reason')
      cy.get('.blog').eq(1).should('contain', "Binh's AOE")
      cy.get('.blog').eq(2).should('contain', "Duy's success")
      cy.get('.blog').eq(3).should('contain', "Least Like for obvious reason")
    })
  })
})
