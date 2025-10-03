import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../app/hooks/useAuth';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockPush = jest.fn();

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  test('initializes with no authentication', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isTeacher).toBe(false);
    expect(result.current.profile).toBe(null);
    expect(result.current.token).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  test('loads profile and token from localStorage', () => {
    const mockProfile = { id: 1, name: 'Test User', is_teacher: true };
    const mockToken = 'test-token';

    localStorage.setItem('profile', JSON.stringify(mockProfile));
    localStorage.setItem('token', mockToken);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isTeacher).toBe(true);
    expect(result.current.profile).toEqual(mockProfile);
    expect(result.current.token).toBe(mockToken);
  });

  test('fetchProfile updates profile and localStorage', async () => {
    const mockProfile = { id: 1, name: 'Fetched User', is_teacher: false };
    mockAxios.get.mockResolvedValue({ data: mockProfile });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.fetchProfile('test-token');
    });

    expect(mockAxios.get).toHaveBeenCalledWith(
      'https://tech-challenge-blog.onrender.com/auth/me',
      {
        headers: { Authorization: 'Bearer test-token' },
      }
    );

    expect(result.current.profile).toEqual(mockProfile);
    expect(localStorage.getItem('profile')).toBe(JSON.stringify(mockProfile));
  });

  test('logout clears data and redirects', () => {
    const mockProfile = { id: 1, name: 'Test User', is_teacher: true };
    const mockToken = 'test-token';

    localStorage.setItem('profile', JSON.stringify(mockProfile));
    localStorage.setItem('token', mockToken);

    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isTeacher).toBe(false);
    expect(result.current.profile).toBe(null);
    expect(result.current.token).toBe(null);
    expect(localStorage.getItem('profile')).toBe(null);
    expect(localStorage.getItem('token')).toBe(null);
    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  test('handles student profile correctly', () => {
    const mockProfile = { id: 1, name: 'Student User', is_teacher: false };
    localStorage.setItem('profile', JSON.stringify(mockProfile));

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isTeacher).toBe(false);
  });

  test('handles profile without is_teacher property', () => {
    const mockProfile = { id: 1, name: 'User Without Teacher Flag' };
    localStorage.setItem('profile', JSON.stringify(mockProfile));

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isTeacher).toBe(false);
  });
});