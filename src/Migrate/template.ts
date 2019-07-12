import { toPascalCase } from '../utils/string'

export const template = (name: string, index: string, time: string): string => {
  const namePascal = toPascalCase(name)
  const nameUpper = index.toUpperCase()
  return `package migrations

import (
	"bitbucket.org/3dsinteractive/pam4/config"
	"bitbucket.org/3dsinteractive/seaman"
	"fmt"
	"github.com/3dsinteractive/migration/driver/golang"
	"os"
)

// Migrate${time}${namePascal} is migration
type Migrate${time}${namePascal} struct {
	migratorBase
}

// NewMigrate${time}${namePascal} return new migration
func NewMigrate${time}${namePascal}() *Migrate${time}${namePascal} {
	return &Migrate${time}${namePascal}{}
}

// Name return name of migration
func (m *Migrate${time}${namePascal}) Name() string {
	return "${time}_${name}"
}

// Up migrate up
func (m *Migrate${time}${namePascal}) Up(c *golang.Config) error {
	shards := os.Getenv("PAM4_INDEX_${nameUpper}_PARTITIONS")
	replicas := os.Getenv("PAM4_INDEX_${nameUpper}_REPLICAS")
	index := "${index}"

	mapping := fmt.Sprintf(\`{
		"mappings":{		  
			"%s":{
				"properties":{
					"name":{
						"type":"keyword",
						"index": true
					},
					"created_at":{
						"type":"date",
						"format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis",
						"index": true
					}
				}
			}
		}
	}\`, shards, replicas, index)

	idx := seaman.NewIndexer(config.NewConfig().IndexerConfig(), seaman.NewLoggerSimple())
	idx.CreateIndex(index, mapping)
	idx.Flush(index)
	return nil
}

// Down migrate down
func (m *Migrate${time}${namePascal}) Down(c *golang.Config) error {
	return nil
}

  `
}
