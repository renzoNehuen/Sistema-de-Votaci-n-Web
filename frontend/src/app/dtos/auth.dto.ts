export interface LoginDto {
  email: string;
  password: string;
}

export interface AdminDto {
  adminId?: number;
  id?: number;
  name: string;
  lastName?: string;
  email: string;
}

export interface LoginResponseDto {
  token: string;
  admin: AdminDto;
}
