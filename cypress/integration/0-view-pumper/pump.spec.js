/// <reference types="cypress" />

describe('pumping views of a youtube video', () => {

  const queue = [
    'https://www.youtube.com/watch?v=rUWxSEwctFU',
    'https://www.youtube.com/watch?v=uI2yZQOKOGk',
    'https://www.youtube.com/watch?v=YxgCXRsdD_0',
    'https://www.youtube.com/watch?v=CGjFAe018oA',
    'https://www.youtube.com/watch?v=_bHqBy92iGM'

  ]

  it('pumps!', () => {
    
    pumpRandomVideo(queue)
    
  })
  
})

function pumpRandomVideo(queue) {
  
    const newVideoIndex = Math.floor(Math.random() * queue.length)

    cy.visit(queue[newVideoIndex])
  
    closePopups()

    skipAd()

    setMaxPlaybackSpeed()

    closePopups()

    waitForCancelButton(queue)

}

function setMaxPlaybackSpeed() {

  const settingsButtonSelector = '.ytp-settings-button'

  const playackSpeedButtonText = 'Playback speed'

  cy.get(settingsButtonSelector).click()

  cy.wait(2000)

  cy.contains(playackSpeedButtonText).click()

  cy.wait(2000)
  
  cy.get('.ytp-menuitem-label').last().click()
  
  cy.wait(2000)
  
  cy.scrollTo(0,0)

}

function skipAd() {

  try {
    cy.contains('Skip Ad').click().timeout(7000)
  }
  catch(err) {
    cy.log('no ad found!')
  }

}

function waitForCancelButton(queue) {

  cy.get('video').and('have.prop', 'ended')

  cy.log('video ended!')

  // pumpRandomVideo(queue)

}

function closePopups() {

  cy.get('body').type('{esc}')

}