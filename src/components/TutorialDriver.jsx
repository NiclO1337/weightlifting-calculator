import { forwardRef, useImperativeHandle } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';


const TutorialDriver = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    start() {
      const driverObj = driver({
        showProgress: true,
        steps: [
          {
            element: '.header-row',
            popover: {
              title: 'Weightlifting Calculator',
              description: 'Welcome to the super duper awesome weightlifting calculator. Perfect for anyone who loves lifting weights and hates math!',
              position: 'bottom',
            },
          },
          {
            element: '.input-group',
            popover: {
              title: '1 Rep Max',
              description: 'Enter your 1 rep max weight here for the current lifting technique. Must be between 0 and 250 kg or it will not calculate.',
              position: 'bottom',
            },
          },
          {
            element: '.rounding-selector',
            popover: {
              title: 'Rounding Selector',
              description: 'Select the rounding option for your calculations depending on your preference or weight plate availability.',
              position: 'bottom',
            },
          },
          {
            element: '.barbell-selector',
            popover: {
              title: 'Barbell Selector',
              description: 'Select your barbell’s weight here. We’ll use it to suggest how to distribute weight plates on each side of the barbell for each target weight.',
              position: 'bottom',
            },
          },
          {
            element: '.percentages-list',
            popover: {
              title: 'Percentage List',
              description:
                'Overview of the calculated percentages, select one to view range in detail.',
              position: 'bottom',
            },
          },
          {
            element: '.percentages-detail',
            popover: {
              title: 'Percentage Detail',
              description:
                'View detailed calculations from the selected range here. You can click on percentages to save them to the list below for faster access and also see the plates needed to load your barbell.',
              position: 'bottom',
            },
          },
          {
            element: '.saved-percentages',
            popover: {
              title: 'Saved Percentages',
              description:
                'View and manage your saved percentage calculations for your current lift. You’ll also see a suggestion of which weight plates to load on <strong>each side</strong> of the barbell. Click any percentage to remove it from the list.',
              position: 'bottom',
            },
          },
        ],
      });
      driverObj.drive();
    }
  }));
  return null;
});

export default TutorialDriver;