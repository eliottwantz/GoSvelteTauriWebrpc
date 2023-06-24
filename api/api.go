package api

import (
	"context"
	"math/rand"
	"time"
)

type ApiServiceRPC struct{}

func NewApiServiceRPC() *ApiServiceRPC {
	return &ApiServiceRPC{}
}

func (a *ApiServiceRPC) RandomNumber(ctx context.Context) (int, error) {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	n := r.Intn(100) + 1
	return n, nil
}
