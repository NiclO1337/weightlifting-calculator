import { forwardRef, useImperativeHandle } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import './TutorialDriver.css'

const MODE_LABELS = {
  oneRM: '1RM Calculator',
  freeCalc: 'Free Calc',
};

const ONE_RM_STEPS = [
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
];

const FREE_CALC_STEPS = [
  {
    element: '.free-calc-total',
    popover: {
      title: 'Total Weight',
      description:
        'See the total weight currently loaded on the barbell here — barbell weight plus every plate on both sides.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '.plate-viz',
    popover: {
      title: 'The Barbell',
      description: 'Plates you add show up here. Click a plate on the bar to remove it.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '.btn-reset',
    popover: {
      title: 'Clear Bar',
      description: 'Remove every plate from the bar at once.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '.barbell-weight-toggle',
    popover: {
      title: 'Barbell Weight',
      description: 'Quickly swap between a 15 kg and 20 kg barbell.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '.plate-palette',
    popover: {
      title: 'Weight Plates',
      description: 'Click a plate to add it to <strong>each side</strong> of the barbell.',
      side: 'top',
      align: 'center',
    },
  },
];

const TutorialDriver = forwardRef(({ mode = 'oneRM' }, ref) => {
  useImperativeHandle(ref, () => ({
    start() {
      const currentModeLabel = MODE_LABELS[mode] ?? MODE_LABELS.oneRM;
      const otherModeLabel =
        mode === 'freeCalc' ? MODE_LABELS.oneRM : MODE_LABELS.freeCalc;

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
            element: '.mode-toggle',
            popover: {
              title: 'Calculator Mode',
              description: `Switch between the 1RM Calculator and Free Calc here. This tutorial currently covers <strong>${currentModeLabel}</strong>.<br>To see tutorial for ${otherModeLabel}, close this tutorial, click on <strong>${otherModeLabel}</strong> to switch and then reopen the tutorial.`,
              side: 'bottom',
              align: 'center',
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
          ...(mode === 'freeCalc' ? FREE_CALC_STEPS : ONE_RM_STEPS),
        ],
      });
      driverObj.drive();
    },
  }));
  return null;
});

export default TutorialDriver;
