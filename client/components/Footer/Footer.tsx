import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiGlobe,
  FiYoutube,
} from 'react-icons/fi'
import FooterCopyRight from './FooterCopyRight'

const socialLinks = [
  {
    id: 1,
    icon: <FiGlobe />,
    url: 'https://react-portfolio-nu-plum.vercel.app/',
  },
  {
    id: 2,
    icon: <FiGithub />,
    url: 'https://github.com/matai-2023/wa-wo',
  },
  {
    id: 3,
    icon: <FiTwitter />,
    url: 'https://twitter.com/',
  },
  {
    id: 4,
    icon: <FiLinkedin />,
    url: 'https://nz.linkedin.com/in/simon-yoo-12b078183',
  },
  {
    id: 5,
    icon: <FiYoutube />,
    url: 'https://www.youtube.com/watch?v=n-6HC-vNe_Y',
  },
]

const Footer = () => {
  return (
  <div className='flex justify-center mt-[100px]'>
    <div className="container">
      <div className="pt-0 sm:pt-10 pb-0 border-t-2 border-primary-light dark:border-secondary-dark mb-0">
        {/* Footer social links */}
        <div className="font-general-regular flex flex-col justify-center items-center mb-0 sm:mb-12">
          <p className="text-l sm:text-2xl text-orange dark:text-primary-light mb-6">
            Wardrobe Wonders
          </p>
          <ul className="flex gap-4 sm:gap-8 mb-8">
            {socialLinks.map((link) => (
              <a
                href={link.url}
                target="__blank"
                key={link.id}
                className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm p-2 duration-300"
              >
                <i className="text-l sm:text-2xl md:text-xl mb-0">
                  {link.icon}
                </i>
              </a>
            ))}
          </ul>
        </div>
        <FooterCopyRight />
      </div>
    </div>
    </div>
  )
}

export default Footer
