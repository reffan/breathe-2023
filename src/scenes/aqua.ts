import { Container, Graphics } from 'pixi.js'
import { SceneAnimation, ProgressAnimations, Scene } from '@/types'

const container = new Container()
container.eventMode = 'none'
container.interactiveChildren = false

const ripples = new Graphics()
container.addChild(ripples)

const initialState = {
  radius: 60,
  opacity: 1,
}

const sceneState = {
  ripples: [
    {
      radius: 0,
      opacity: 0,
    },
    {
      radius: 0,
      opacity: 0,
    },
    {
      radius: 0,
      opacity: 0,
    },
  ],
}

const aqua = (): Scene => {
  const enterScene = (): SceneAnimation => {
    return {
      targets: sceneState.ripples,
      transformations: {
        radius: [0, initialState.radius],
        opacity: [0, initialState.opacity],
      },
      duration: 1080,
      stagger: 1080 * 0.18,
    }
  }

  const exitScene = (): SceneAnimation => {
    return {
      targets: sceneState.ripples,
      transformations: {
        radius: 0,
        opacity: 0,
      },
      duration: 840,
      stagger: 840 * 0.09,
    }
  }

  const startScene = (): SceneAnimation => {
    return {
      targets: sceneState.ripples,
      transformations: {
        radius: 24,
        opacity: initialState.opacity,
      },
    }
  }

  const stopScene = (): SceneAnimation => {
    return {
      targets: sceneState.ripples,
      transformations: {
        radius: 24,
        opacity: initialState.opacity,
      },
    }
  }

  const idleScene = (): SceneAnimation => {
    return {
      targets: sceneState.ripples,
      transformations: {
        // opacity: [0.84, 1],
        // radius: [20, 24],
        radius: initialState.radius,
        opacity: initialState.opacity,
      },
      // duration: 3600,
      // loop: true,
      // direction: 'alternate',
      // easing: 'easeInOutSine',
    }
  }

  const runScene = (): ProgressAnimations => {
    return {
      // cycle: {
      //   targets: [],
      //   transformations: [],
      // },
      step: {
        targets: sceneState.ripples,
        transformations: [
          {
            radius: 144,
          },
          {},
          {
            radius: 12,
          },
          {},
        ],
        easing: 'easeInOutSine',
      },
      count: {
        targets: sceneState.ripples,
        transformations: [
          {},
          {
            opacity: [0.72, 1],
          },
          {},
          {
            opacity: [0.72, 1],
          },
        ],
        easing: 'easeInOutSine',
      },
    }
  }

  const fractions = {
    cycle: 1,
    step: 1,
    count: 0.72,
    stagger: 0.18,
  }

  const resize = (width: number, height: number) => {
    container.position.x = width / 2
    container.position.y = height / 2
  }

  const draw = () => {
    ripples.clear()

    sceneState.ripples.forEach((ripple, index) => {
      ripples.lineStyle(3 / (index + 1), '#FFFFFF', ripple.opacity / (index + 1))
      ripples.drawCircle(0, 0, ripple.radius)
      ripples.closePath()
    })
  }

  return {
    container,
    resize,
    draw,

    enterScene,
    exitScene,
    startScene,
    stopScene,
    idleScene,
    runScene,

    fractions,
  }
}

export default aqua
