package database

import (
	"os"

	"github.com/cornking2020/ml-pipeline/constants"
	"go.uber.org/zap"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func NewDatabase(logger *zap.SugaredLogger) {

	var err error
	dsn := os.Getenv("DB_DSN")

	mc := mysql.Config{
		DSN:                       dsn,
		DefaultStringSize:         191,   // default length of string type field
		SkipInitializeWithVersion: false, // Automatic configuration based on version
		DisableDatetimePrecision:  true,  // Disable datetime precision. Databases before MySQL 5.6 do not support it.
		DontSupportRenameIndex:    true,
		DontSupportRenameColumn:   true,
	}

	db, err = gorm.Open(mysql.New(mc), &gorm.Config{})

	if err != nil {
		logger.Error(constants.StorageError, zap.Error(err))
	}

	sqlDB, err := db.DB()
	if err != nil {
		panic(err)
	}

	sqlDB.SetMaxIdleConns(10)

	if os.Getenv("DB_MIGRATE") == "true" {
		err = db.AutoMigrate(
			&Organization{},
			&Member{},
			&Workload{},
		)
		if err != nil {
			panic(err)
		}
	}

}
