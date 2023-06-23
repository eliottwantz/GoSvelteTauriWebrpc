package api

import (
	"context"
	"time"
)

type ExampleServiceRPC struct {
	users map[uint64]*User
}

func NewExampleServiceRPC() *ExampleServiceRPC {
	return &ExampleServiceRPC{
		users: map[uint64]*User{
			1: {
				Id:        1,
				Username:  "testuser",
				CreatedAt: time.Now(),
			},
		},
	}
}

func (s *ExampleServiceRPC) Ping(ctx context.Context) error {
	return nil
}

func (s *ExampleServiceRPC) Status(ctx context.Context) (bool, error) {
	return true, nil
}

func (s *ExampleServiceRPC) GetUserByID(ctx context.Context, userID uint64) (*User, error) {
	return s.getUserByID(userID), nil
}

func (s *ExampleServiceRPC) getUserByID(userID uint64) *User {
	for _, u := range s.users {
		if u.Id == userID {
			return u
		}
	}
	return nil
}

func (s *ExampleServiceRPC) IsOnline(ctx context.Context, userID uint64) (bool, error) {
	return s.getUserByID(userID) != nil, nil
}

func (s *ExampleServiceRPC) ListUsers(ctx context.Context, q *UsersQueryFilter) (uint32, []*User, error) {
	users := make([]*User, 0)
	for _, u := range s.users {
		users = append(users, u)
	}
	return uint32(len(users)), users, nil
}
