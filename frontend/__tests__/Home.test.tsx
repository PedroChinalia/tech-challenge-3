import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Home from '../app/page';
import { useAuth } from '../app/hooks/useAuth';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('axios');
jest.mock('../app/hooks/useAuth');

const mockPush = jest.fn();
const mockAxios = axios as jest.Mocked<typeof axios>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  test('renders loading state initially', () => {
    mockUseAuth.mockReturnValue({
      isTeacher: false,
      isAuthenticated: true,
      profile: null,
      token: null,
      loading: true,
      fetchProfile: jest.fn(),
      logout: jest.fn(),
    });

    mockAxios.get.mockResolvedValue({ data: [] });

    render(<Home />);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  test('redirects to login when not authenticated', async () => {
    mockUseAuth.mockReturnValue({
      isTeacher: false,
      isAuthenticated: false,
      profile: null,
      token: null,
      loading: false,
      fetchProfile: jest.fn(),
      logout: jest.fn(),
    });

    mockAxios.get.mockResolvedValue({ data: [] });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Você precisa fazer login!')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    }, { timeout: 2000 });
  });

  test('renders posts list when authenticated', async () => {
    const mockPosts = [
      {
        id: 1,
        title: 'Test Post 1',
        content: 'Content 1',
        author: 'Author 1',
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        title: 'Test Post 2',
        content: 'Content 2',
        author: 'Author 2',
        created_at: '2024-01-02T00:00:00Z'
      }
    ];

    mockUseAuth.mockReturnValue({
      isTeacher: false,
      isAuthenticated: true,
      profile: { id: 1, name: 'Student' },
      token: 'mock-token',
      loading: false,
      fetchProfile: jest.fn(),
      logout: jest.fn(),
    });

    mockAxios.get.mockResolvedValue({ data: mockPosts });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Lista de postagens')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });
  });

  test('shows create button for teachers', async () => {
    mockUseAuth.mockReturnValue({
      isTeacher: true,
      isAuthenticated: true,
      profile: { id: 1, name: 'Teacher', is_teacher: true },
      token: 'mock-token',
      loading: false,
      fetchProfile: jest.fn(),
      logout: jest.fn(),
    });

    mockAxios.get.mockResolvedValue({ data: [] });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Criar Postagem')).toBeInTheDocument();
    });
  });

  test('does not show create button for students', async () => {
    mockUseAuth.mockReturnValue({
      isTeacher: false,
      isAuthenticated: true,
      profile: { id: 1, name: 'Student', is_teacher: false },
      token: 'mock-token',
      loading: false,
      fetchProfile: jest.fn(),
      logout: jest.fn(),
    });

    mockAxios.get.mockResolvedValue({ data: [] });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Lista de postagens')).toBeInTheDocument();
    });

    expect(screen.queryByText('Criar Postagem')).not.toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    mockUseAuth.mockReturnValue({
      isTeacher: false,
      isAuthenticated: true,
      profile: { id: 1, name: 'Student' },
      token: 'mock-token',
      loading: false,
      fetchProfile: jest.fn(),
      logout: jest.fn(),
    });

    mockAxios.get.mockRejectedValue(new Error('API Error'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Lista de postagens')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Nenhum post encontrado.')).toBeInTheDocument();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao buscar os posts:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});