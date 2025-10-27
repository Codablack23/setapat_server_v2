import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface OnlineUser {
  user_id: string;
  username: string;
  socket_ids: string[];
}

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private server: Server;
  private onlineUsers: OnlineUser[] = [];

  afterInit(server: Server) {
    this.server = server;
    console.log('✅ Socket Server Initialized successfully');
  }

  handleConnection(client: Socket) {
    console.log(`🟢 Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`🔴 Client disconnected: ${client.id}`);
    this.removeUserSocket(client.id);
  }

  @SubscribeMessage('connect-user')
  async handleUserConnection(
    client: Socket,
    data: { user_id: string; username: string },
  ) {
    await client.join(data.user_id);

    const existing = this.onlineUsers.find((u) => u.user_id === data.user_id);
    if (existing) {
      existing.socket_ids.push(client.id);
    } else {
      this.onlineUsers.push({
        user_id: data.user_id,
        username: data.username,
        socket_ids: [client.id],
      });
    }

    // broadcast to everyone
    this.broadcastOnlineUsers();
  }

  private removeUserSocket(socketId: string) {
    let shouldBroadcast = false;
    this.onlineUsers = this.onlineUsers.map((user) => {
      user.socket_ids = user.socket_ids.filter((id) => id !== socketId);
      return user;
    });

    const before = this.onlineUsers.length;
    this.onlineUsers = this.onlineUsers.filter((u) => u.socket_ids.length > 0);
    if (this.onlineUsers.length !== before) shouldBroadcast = true;

    if (shouldBroadcast) {
      this.broadcastOnlineUsers();
    }
  }

  private broadcastOnlineUsers() {
    const users = this.onlineUsers.map(({ user_id, username }) => ({
      user_id,
      username,
    }));
    this.server.emit('online-users', { online_users: users });
  }

  @SubscribeMessage('new-message')
  emitNewMessage(userId: string, payload?: Record<string, any>) {
    this.server.to(userId).emit('new-message', payload);
  }
  @SubscribeMessage('new-notification')
  emitNewNotification<T = Record<string, any>>(
    userId: string,
    notification: T,
  ) {
    this.server.to(userId).emit('new-notification', {
      notification,
    });
  }

  emitClientEvent<T = Record<string, any>>(
    event: string,
    data: T,
    receivers: string[],
  ) {
    receivers.forEach((receiver) => {
      this.server.to(receiver).emit(event, data);
    });
  }
}
