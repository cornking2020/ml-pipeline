package constants

import "errors"

var (
	StorageError   = errors.New("storage_error")
	MemberNotFound = errors.New("member_not_found")
)
