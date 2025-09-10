
import TutorialDriver from './TutorialDriver';
import { MessageCircleQuestionMark } from 'lucide-react';

export default function Header({ showTutorial, setShowTutorial}) {
  return (
    <div className='header-row'>
      <h1 className='special-font'>
        Weightlifting <br /> Calculator
      </h1>

      <button className='question-icon' onClick={() => setShowTutorial(true)}>
        <MessageCircleQuestionMark size={30} />
        <span className='visually-hidden'>Start Tutorial</span>
        <TutorialDriver
          start={showTutorial}
          onClose={() => setShowTutorial(false)}
        />
      </button>
    </div>
  );
}
