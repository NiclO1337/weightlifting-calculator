
import { useRef } from 'react';
import TutorialDriver from './TutorialDriver';
import { MessageCircleQuestionMark } from 'lucide-react';

export default function Header() {
  const tutorialRef = useRef();

  return (
    <div className='header-row'>
      <h1 className='special-font'>
        Weightlifting <br /> Calculator
      </h1>
      <button className='question-icon' onClick={() => tutorialRef.current?.start()}>
        <MessageCircleQuestionMark size={30} />
        <span className='visually-hidden'>Start Tutorial</span>
        <TutorialDriver
          ref={tutorialRef}
        />
      </button>
    </div>
  );
}
