# Lambda

This terraform module creates the Lambda functions with necessary permissions. 


## Configurations

The following values that are to be updated while using this module. Not all the variables are listed here.

### var.tf

| Name                      | Values                             | Description                                                                                                                                                                                                                                                            |
| ------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| team             | csengineering         | Team which is responsible for the development and versioning of the reource. e.g. csengineering/csengineeringsolutions/cssupport                                                                                                                                                                                                                                                                                                 |
| owner             | owner@xxx.com         | Email address of the person or the distribution list, to be notified about events associated with the resources                                                                                                                                                                                                                                                                                                     |
| application             | capitalstream         | Description of the Application or the Client Name                                                                                                                                                                                                                                                                                                    |
| version_number           | xxx.xx.xx         | A Version number which can be used to identify significant revisions to the resources.                                                                                                                                                                                                                                                                                               |
| **env**                 | xxxxxxx               | Name of the environment. Environment name should match the branch name in the git.                                                                                                                                                                                                                        |
| costcenter           | llna:csengineering        | The cost center responsible for aggregating the expenses associtate with having the resource available                                                                                                                                                                                                                                                                                                     |
| customer           | xxxxxxx         | Name of the customer where this resources are assigned                                                                                                                                                                                                                                                                                                    |
| customercontact           | customercontact@xxx.com        | Email address of a customer or customer distribution list,to which any customer-specific resources are assigned, who would be notified of events associated with the resources                                                                                                                                                                                                                                                                                                    |
| autoshutoff           | false         | Boolean value (true/false). A value of "true" will enable auto shutdown of resource when not in use                                                                                                                                                                                                                                                                                                    |
| destroy           | false         | Boolean Value. Determines whether or not resource can be destroyed as part of automation process                                                                                                                                                                                                                                                                                                    |
| component           | rd-oracle         | Component                                                                                                                                                                                                                                                                                                    |
| **account_id**          | ************          | AWS Account ID                                                                                                                                                                                                                                                                                                                                       |
| operationhours           | Mo-Fr-05:30-18:00         | Operational Hours. e.g. Open on Weekdays from 5:30 AM to 6 PM                                                                                                                                                                                                                         |
| **region**                | us-west-2                          | AWS region                                                                                                                                                                                                                                                             |
| **databasesSchemas**     | cs-sre-oracle                | Provide database identifier name whose snapshot need to be taken                                                                                                                                                      |
| **cronExpression**   | ``cron(0 0/1 1/1 * ? *)     ``                     | Cron expression to create snapshots in certain interval
 |
| **migrate_snapshot**   |  YES / NO   | Flag to allow or deny cross region copy of snapshot
|
| **createSnapshotFile**   |  create_snapshot.zip   | Create Snapshot function zipped file name
|
| **copySnapshotFile**   |  copy_snapshot.zip   | Copy Snapshot function zipped file name 
|
| **sourceRegion**   |  us-west-2   | Region where oracle database exists and  snapshot need to be created
|
| **destRegion**   |  us-east-1   | Region where  snapshot  will be copied
|
| **kmsKeyId**   | ********   | KMS Key of destination region for rds
|
| **snapsToKeep**   |  5   | Number of total snapshots to keep 
|
| **lambdaTimeout**   |  900   | Timeout seconds for function execution(maximum seconds is 900(15 mins))
|

### state.tf


| Name   | Value                                    | Description                                                                                                                                                                                |
| ------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| bucket | linedata-states-xxxx                     | Name of the S3 bucket to store the terraform state files. For Production it is recommended to use linedata-states-prod and for non production it is recommended to use linedata-states-eng |
| key    | capitalstream-%evn%-%foldername%.tfstate | Name of the key used to store the state file.                                                                                                                                              |

```
Important!

Double check the key name. Using the duplicate key name will override others state file.

Naming convention for the key capitalstream-%evn%-%foldername%.tfstate

```

## Outputs

The following are the outputs from this module that are stored in the state file.


| Name                | Description                          |
| ------------------- | ------------------------------------ |
| rds_oracle_endpoint | Endpoint for the RDS Oracle database |
| oracle_cname        | CNAME for the oracle database        |
