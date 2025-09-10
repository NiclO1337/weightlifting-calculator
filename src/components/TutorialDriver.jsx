import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export default function TutorialDriver({ start, onClose }) {
  useEffect(() => {
    if (start) {
      const driverObj = driver({
        showProgress: true,
        steps: [
          {
            element: '.input-group',
            popover: {
              title: '1 Rep Max',
              description: 'Enter your 1 rep max weight here for the current lifting technique.',
              position: 'bottom',
            },
          },
          {
            element: '.rounding-selector',
            popover: {
              title: 'Rounding Selector',
              description: 'Select the rounding option for your calculations depending on your preference and weight plate availability.',
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
                'View detailed calculations from the selected range here. You can click on percentages to save them to the list below for faster access.',
              position: 'bottom',
            },
          },
          {
            element: '.saved-percentages',
            popover: {
              title: 'Saved Percentages',
              description:
                'View and manage your saved percentage calculations here for your current lift. Click on them to remove them from the list.',
              position: 'bottom',
            },
          },
        ],
        onDestroyed: onClose,
        onReset: onClose,

      });
      driverObj.drive();
    }
  }, [start, onClose]);
  return null;
}
