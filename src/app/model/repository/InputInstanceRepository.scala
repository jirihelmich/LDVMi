package model.repository

import model.entity.CustomUnicornPlay.driver.simple._
import model.entity._

import scala.slick.lifted.TableQuery

class InputInstanceRepository extends CrudRepository[InputInstanceId, InputInstance, InputInstanceTable](TableQuery[InputInstanceTable])
