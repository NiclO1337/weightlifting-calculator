import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  const STORAGE_DEFAULTS = {
    exercises1RM: {
      snatch: 50,
      backSquat: 100,
    },
    selectedExercise: 'snatch',
    barbellWeight: 15,
    availablePlates: null,
    savedPercentages: [73, 77, 81],
    rounding: 0.5,
  };

  const seedLocalStorage = (overrides = {}) => {
    const values = { ...STORAGE_DEFAULTS, ...overrides };

    Object.entries(values).forEach(([key, value]) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    });
  };

  const getPercentageListSection = () =>
    screen.getByRole('region', { name: /Percentage list/i });

  const getPercentageDetailSection = () =>
    screen.getByRole('region', { name: /Percentage detail/i });

  const getSavedPercentagesSection = () =>
    screen.getByRole('region', { name: /Saved percentages/i });

  const renderComponent = ({ localStorageSeed, ...props } = {}) => {
    seedLocalStorage(localStorageSeed);

    const user = userEvent.setup();

    return {
      user,
      ...render(<App {...props} />),
    };
  };

  afterEach(() => {
    localStorage.clear();
  });

  it('renders percentage details when range is selected', async () => {
    const { user } = renderComponent();

    const percentageListSection = getPercentageListSection();
    const percentageDetailSection = getPercentageDetailSection();

    const button = within(percentageListSection).getByRole('button', {
      name: /80%/i,
    });

    await user.click(button);

    expect(
      within(percentageDetailSection).getByText(/85%/i),
    ).toBeInTheDocument();
  });

  it('renders new calculations when selected exercise changes', async () => {
    const { user } = renderComponent();

    const selectExercise = screen.getByRole('combobox', {
      name: /exercise/i,
    });

    const oldValue = screen.getByText(/80%/).textContent;

    await user.selectOptions(selectExercise, 'backSquat');

    const newValue = screen.getByText(/80%/).textContent;

    expect(selectExercise).toHaveValue('backSquat');

    expect(oldValue).not.toBe(newValue);
  });

  it('saves percentage to list when clicking on button', async () => {
    const { user } = renderComponent();

    const savedPercentagesSection = getSavedPercentagesSection();
    const percentageDetailSection = getPercentageDetailSection();

    expect(savedPercentagesSection).not.toHaveTextContent(/75%/i);

    const button = within(percentageDetailSection).getByRole('button', {
      name: /75%/i,
    });

    await user.click(button);

    expect(savedPercentagesSection).toHaveTextContent(/75%/i);
  });

  it('removing saved percentage removes it from the list', async () => {
    const { user } = renderComponent({
      localStorageSeed: { savedPercentages: [73, 75, 77] }
    });

    const section = getSavedPercentagesSection();

    expect(section).toHaveTextContent(/75%/i);

    const savedItem = within(section).getByText(/75%/i);

    await user.click(savedItem);

    const removeButton = within(savedItem).getByRole('button', {
      name: /remove/i,
    });

    await user.click(removeButton);

    expect(section).not.toHaveTextContent(/75%/i);
  });

  it('saves selected settings to local storage', async () => {
    const { user } = renderComponent();

    const settingsButton = screen.getByRole('button', { name: /Open Settings/i });

    await user.click(settingsButton);

    const roundingSetting = screen.getByRole('combobox', { name: /Round to:/i });

    await user.selectOptions(roundingSetting, '2.5');

    expect(JSON.parse(localStorage.getItem('rounding'))).toBe(2.5);
  })

  it('changes plate loading when barbell weight changes', async () => {
    const { user } = renderComponent();

    const section = getSavedPercentagesSection();

    const oldLoading = within(section).getByText(/73%/i).textContent

    const settingsButton = screen.getByRole('button', { name: /Open Settings/i });

    await user.click(settingsButton);

    const barbellSetting = screen.getByRole('combobox', { name: /Barbell:/i });

    await user.selectOptions(barbellSetting, '20');

    const newLoading = within(section).getByText(/73%/i).textContent

    expect(newLoading).not.toBe(oldLoading);
  });
});