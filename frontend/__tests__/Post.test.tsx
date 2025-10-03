import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Post from '../app/components/post';
import { useAuth } from '../app/hooks/useAuth';

jest.mock('axios');
jest.mock('../app/hooks/useAuth');

const mockAxios = axios as jest.Mocked<typeof axios>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

const mockPostProps = {
  id: 1,
  title: 'Test Post',
  content: 'This is a test post content',
  date: '2024-01-01',
  author: 'Test Author'
};

const mockReload = jest.fn();

// Mock window.location globally
delete (window as any).location;
(window as any).location = {
  reload: mockReload,
};

describe('Post Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockReload.mockClear();
  });

  test('renders post content correctly', () => {
    mockUseAuth.mockReturnValue({
      isTeacher: false,
      isAuthenticated: true,
      profile: null,
      token: 'mock-token',
      loading: false,
      fetchProfile: jest.fn(),
      logout: jest.fn(),
    });

    render(<Post {...mockPostProps} />);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test post content')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });

  test('shows only view button for students', () => {
    mockUseAuth.mockReturnValue({
      isTeacher: false,
      isAuthenticated: true,
      profile: { is_teacher: false },
      token: 'mock-token',
      loading: false,
      fetchProfile: jest.fn(),
      logout: jest.fn(),
    });

    render(<Post {...mockPostProps} />);

    expect(screen.getByLabelText('see-post')).toBeInTheDocument();
    expect(screen.queryByLabelText('edit-post')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('delete-post')).not.toBeInTheDocument();
  });

  test('shows all buttons for teachers', () => {
    mockUseAuth.mockReturnValue({
      isTeacher: true,
      isAuthenticated: true,
      profile: { is_teacher: true },
      token: 'mock-token',
      loading: false,
      fetchProfile: jest.fn(),
      logout: jest.fn(),
    });

    render(<Post {...mockPostProps} />);

    expect(screen.getByLabelText('see-post')).toBeInTheDocument();
    expect(screen.getByLabelText('edit-post')).toBeInTheDocument();
    expect(screen.getByLabelText('delete-post')).toBeInTheDocument();
  });

  test('opens delete confirmation dialog', () => {
    mockUseAuth.mockReturnValue({
      isTeacher: true,
      isAuthenticated: true,
      profile: { is_teacher: true },
      token: 'mock-token',
      loading: false,
      fetchProfile: jest.fn(),
      logout: jest.fn(),
    });

    render(<Post {...mockPostProps} />);

    const deleteButton = screen.getByLabelText('delete-post');
    fireEvent.click(deleteButton);

    expect(screen.getByText('Deseja mesmo excluir esta postagem? Esta ação não pode ser desfeita!')).toBeInTheDocument();
  });

  test('handles successful delete', async () => {
    mockUseAuth.mockReturnValue({
      isTeacher: true,
      isAuthenticated: true,
      profile: { is_teacher: true },
      token: 'mock-token',
      loading: false,
      fetchProfile: jest.fn(),
      logout: jest.fn(),
    });

    mockAxios.delete.mockResolvedValue({});

    render(<Post {...mockPostProps} />);

    const deleteButton = screen.getByLabelText('delete-post');
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirmar/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockAxios.delete).toHaveBeenCalledWith(
        'https://tech-challenge-blog.onrender.com/posts/1',
        {
          headers: {
            Authorization: 'Bearer mock-token',
          },
        }
      );
    });
  });

  test('handles delete error', async () => {
    mockUseAuth.mockReturnValue({
      isTeacher: true,
      isAuthenticated: true,
      profile: { is_teacher: true },
      token: 'mock-token',
      loading: false,
      fetchProfile: jest.fn(),
      logout: jest.fn(),
    });

    mockAxios.delete.mockRejectedValue(new Error('Delete failed'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Post {...mockPostProps} />);

    const deleteButton = screen.getByLabelText('delete-post');
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirmar/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao excluir post:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });
});