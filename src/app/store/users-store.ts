import { signal, computed } from '@angular/core';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../shared/models/users-modal';



@Injectable({ providedIn: 'root' })
export class UserStore {
  private usersSignal = signal<User[]>([]);
  users = computed(() => this.usersSignal());

  addUser(user: Omit<User, 'id'>) {
    const newUser: User = { ...user, id: uuidv4() };
    this.usersSignal.set([...this.usersSignal(), newUser]);
  }

  updateUser(updated: User) {
    this.usersSignal.set(
      this.usersSignal().map(u => (u.id === updated.id ? updated : u))
    );
  }
  
  getUserById(id: string): User | undefined {
    return this.usersSignal().find(user => user.id === id);
  }
  

  deleteUser(id: string) {
    this.usersSignal.set(this.usersSignal().filter(u => u.id !== id));
  }

  roleDistribution = computed(() => {
    const counts: Record<string, number> = {};
    for (const user of this.usersSignal()) {
      counts[user.role] = (counts[user.role] || 0) + 1;
    }
    return counts;
  });
}
