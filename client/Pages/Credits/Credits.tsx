import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Credits() {
  const [state, setState] = useState(0)
  useEffect(() => {
    const timer = setTimeout(
      () => {
        // Increment the value by 1, but reset to 0 if it reaches 10
        if (state < 21) setState(state + 1)
      },
      state == 0 ? 10 : 3500
    ) // 10000 milliseconds = 10 seconds

    return () => {
      // Clear the timer when the component unmounts or when the dependency array changes
      clearTimeout(timer)
    }
  }, [state])

  //Play music after second pic
  useEffect(() => {
    const audioFile = '/Samba.mp3'
    const audio = new Audio(audioFile)
    if (state == 2) {
      audio.play()
    }
  }, [state])

  const data = [
    { name: 'Special thanks to:' },
    {
      name: 'Ahmad',
    },
    { name: 'Daph' },
    { name: 'Jared' },
    { name: 'I just wanna be RICH & HAPPEE' },
    { name: 'PHOENIX' },
    { name: 'Helena' },
    { name: `All the Moms` },
    { name: `All the Dads` },
    { name: `Simon's wife and kidz` },
    { name: 'and especially our best friend...' },
    { name: 'CHATGPT' },
  ]

  return (
    <div className="max-h-fit mb-[40px]">
      {state == 1 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="justify-self-center">
              <p
                className="flex flex-col items-center justify-center
              animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black mt-[150px]"
              >
                Thanks for viewing our website.
              </p>
              <p
                className="flex flex-col items-center justify-center
              animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black p-4"
              >
                Check out how we got here.
              </p>
            </div>
          </motion.div>
        </>
      )}

      {state == 2 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            exit={{ opacity: 0, translateY: 50 }}
          >
            <p
              className="flex flex-col items-center justify-center gap-2
        animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            >
              Discovery
            </p>
            <div className="flex items-center justify-center">
              <img
                src="cp/discover.jpg"
                alt=""
                className="flex flex-col object-contain w-[150] h-[450px] rounded-full border"
              />
            </div>
            <div>
              <p className="flex justify-center items-center text-3xl">
                Learning new things everyday
              </p>
            </div>
          </motion.div>
        </>
      )}

      {state == 3 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center mb-5
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            >
              Hunger
            </p>
            <div className="flex items-center justify-center">
              <img
                src="cp/hunger.jpg"
                alt="hunger"
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-3xl">
              You gotta feed the machine
            </p>
          </motion.div>
        </>
      )}
      {state == 4 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            >
              Focus
            </p>
            <div className="flex items-center justify-center">
              <img
                src="cp/board.jpg"
                alt="board"
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-3xl">
              Focus, extreme focus
            </p>
          </motion.div>
        </>
      )}
      {state == 5 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            >
              Professionalism
            </p>
            <div className="flex items-center justify-center">
              <img
                src="cp/professional.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl"></p>
          </motion.div>
        </>
      )}
      {state == 6 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            >
              Contemplation
            </p>
            <div className="flex items-center justify-center">
              <img
                src="cp/contemp.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl">
              Rethinking everything
            </p>
          </motion.div>
        </>
      )}
      {state == 7 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            >
              Exhaustion
            </p>
            <div className="flex items-center justify-center">
              <img
                src="cp/exhustion.jpg"
                alt=""
                className="flex flex-col object-contain w-[150] h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl">
              Always make sure to find time to rest
            </p>
          </motion.div>
        </>
      )}
      {state == 8 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            >
              WellBeing
            </p>
            <div className="flex items-center justify-center">
              <img
                src="cp/well.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl">
              Taking care of our physical WellBeing
            </p>
          </motion.div>
        </>
      )}
      {state == 9 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            >
              Just Chilling
            </p>
            <div className="flex items-center justify-center">
              <img
                src="cp/drinks.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl">
              A little R&R
            </p>
          </motion.div>
        </>
      )}
      {state == 10 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            >
              Just
            </p>
            <div className="flex items-center justify-center">
              <img
                src="cp/cooking.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl">
              A little R&R
            </p>
          </motion.div>
        </>
      )}
      {state == 11 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            ></p>
            <div className="flex items-center justify-center">
              <img
                src="cp/feedingtime.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl">
              A little R&R
            </p>
          </motion.div>
        </>
      )}
      {state == 12 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            ></p>
            <div className="flex items-center justify-center">
              <img
                src="cp/friends.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl"></p>
          </motion.div>
        </>
      )}
      {state == 13 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            ></p>
            <div className="flex items-center justify-center">
              <img
                src="cp/humaid.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl"></p>
          </motion.div>
        </>
      )}
      {state == 14 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            ></p>
            <div className="flex items-center justify-center">
              <img
                src="cp/keyboard.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl"></p>
          </motion.div>
        </>
      )}
      {state == 15 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            ></p>
            <div className="flex items-center justify-center">
              <img
                src="cp/lyingdown.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl"></p>
          </motion.div>
        </>
      )}
      {state == 16 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            ></p>
            <div className="flex items-center justify-center">
              <img
                src="cp/mvpboard.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl"></p>
          </motion.div>
        </>
      )}
      {state == 17 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            ></p>
            <div className="flex items-center justify-center">
              <img
                src="cp/park1.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl"></p>
          </motion.div>
        </>
      )}
      {state == 18 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            ></p>
            <div className="flex items-center justify-center">
              <img
                src="cp/park2.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl"></p>
          </motion.div>
        </>
      )}
      {state == 19 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            ></p>
            <div className="flex items-center justify-center">
              <img
                src="cp/tree.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl"></p>
          </motion.div>
        </>
      )}
      {state == 20 && (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="flex flex-col items-center justify-center
      animate-text bg-gradient-to-r from-orange via-purple-500 to-orange bg-clip-text text-transparent text-5xl font-black"
            ></p>
            <div className="flex items-center justify-center">
              <img
                src="cp/ryan&board.jpg"
                alt=""
                className="flex flex-col object-contain w- h-[450px] rounded-full border"
              />
            </div>
            <p className="flex justify-center items-center text-2xl"></p>
          </motion.div>
        </>
      )}
      {state == 21 && (
        <div className="flex flex-col justify-center items-center gap-4">
          {data.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.8, delay: i * 0.8 }}
            >
              <p className="text-2xl text-orange">{item.name}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
