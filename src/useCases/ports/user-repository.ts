export interface UserRepository {
  exists(email: string): Promise<boolean>
}
