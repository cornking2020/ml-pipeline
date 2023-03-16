package database

import "gorm.io/gorm"

type BaseModel struct {
	CreatedAt int64          `gorm:"column:created_at;autoCreateTime:milli;" json:"created_at"`
	UpdatedAt int64          `gorm:"column:updated_at;autoUpdateTime:milli;" json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"column:deleted_at;index;" json:"-"`
}

type BaseModeWithID struct {
	BaseModel
	ID uint64 `gorm:"column:id;autoIncrement;" json:"id"`
}

type Organization struct {
	BaseModeWithID
	Name string `gorm:"column:name;size:64;not null;index;unique;" json:"name"`

	Members []Member `gorm:"many2many:member_organizations" json:"members"`
}

type Member struct {
	BaseModeWithID
	Username string `gorm:"not null;index;unique;" json:"username"`
	Password string `gorm:"not null;" json:"password"`
}

type Workload struct {
	BaseModeWithID
	Title        string `json:"title"`
	WorkloadType uint64 `json:"workload_type"`
}
