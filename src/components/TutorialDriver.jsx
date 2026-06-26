import { forwardRef, useImperativeHandle } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import './TutorialDriver.css'

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
              description:
                'Welcome to the super duper awesome weightlifting calculator. Perfect for anyone who loves lifting weights and hates math!',
              side: 'bottom',
              align: 'center',
            },
          },
          {
            element: '#exercise-select',
            popover: {
              title: 'Exercise Selector',
              description:
                'Choose your current exercise here, or choose "Custom exercise" if your desired one is not listed.',
              side: 'bottom',
              align: 'start',
            },
          },
          {
            element: '.settings-menu',
            popover: {
              title: 'Settings Menu',
              description:
                'Open the settings to enter your one-rep max for each exercise, set your barbell weight, choose a rounding method, and select available plates — all of which determine the plate-loading suggestions.',
              side: 'bottom',
              align: 'end',
            },
          },
          {
            element: '.percentages-list',
            popover: {
              title: 'Percentage List',
              description:
                'Overview of the calculated percentages, select one to view range in detail.',
              side: 'bottom',
              align: 'start',
            },
          },
          {
            element: '.percentages-detail',
            popover: {
              title: 'Percentage Detail',
              description:
                'View detailed calculations from the selected range here. You can click on percentages to save them to the list below for faster access and also see the plates needed to load your barbell.',
              side: 'bottom',
              align: 'end',
            },
          },
          {
            element: '.text-smaller',
            popover: {
              title: 'Saved Percentages',
              description:
                'View and manage your saved percentage calculations for your current lift. You’ll also see a suggestion of which weight plates to load on <strong>each side</strong> of the barbell. Click any percentage to remove it from the list.',
              side: 'top',
              align: 'center',
            },
          },
        ],
      });
      driverObj.drive();
    },
  }));
  return null;
});

export default TutorialDriver;
