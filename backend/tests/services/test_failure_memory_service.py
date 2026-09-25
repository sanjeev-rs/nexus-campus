from unittest.mock import Mock

# Load the application's SQLAlchemy model registry.
# This ensures relationships such as FailureMemory -> Project
# are registered before FailureMemory objects are created.
import app.database.connection

from app.services import failure_memory_service


# ============================================================
# GET FAILURE TESTS
# ============================================================

def test_get_failure_returns_failure():
    db = Mock()

    failure = Mock()
    failure.id = 1

    query = Mock()
    query.filter.return_value.first.return_value = failure

    db.query.return_value = query

    result = failure_memory_service.get_failure(
        db=db,
        failure_id=1,
    )

    assert result is failure


def test_get_failure_returns_none_when_missing():
    db = Mock()

    query = Mock()
    query.filter.return_value.first.return_value = None

    db.query.return_value = query

    result = failure_memory_service.get_failure(
        db=db,
        failure_id=999,
    )

    assert result is None


# ============================================================
# GET FAILURE MEMORY ALIAS
# ============================================================

def test_get_failure_memory_alias():
    db = Mock()
    expected = Mock()

    original = failure_memory_service.get_failure

    try:
        failure_memory_service.get_failure = Mock(
            return_value=expected
        )

        result = failure_memory_service.get_failure_memory(
            db=db,
            failure_id=10,
        )

        assert result is expected

        failure_memory_service.get_failure.assert_called_once_with(
            db,
            10,
        )

    finally:
        failure_memory_service.get_failure = original


# ============================================================
# GET PROJECT FAILURES
# ============================================================

def test_get_project_failures():
    db = Mock()

    failures = [
        Mock(),
        Mock(),
        Mock(),
    ]

    query = Mock()
    query.filter.return_value.all.return_value = failures

    db.query.return_value = query

    result = failure_memory_service.get_project_failures(
        db=db,
        project_id=5,
    )

    assert result == failures
    assert len(result) == 3


# ============================================================
# GET FAILURES ALIAS
# ============================================================

def test_get_failures_alias():
    db = Mock()

    expected = [
        Mock(),
        Mock(),
    ]

    original = failure_memory_service.get_project_failures

    try:
        failure_memory_service.get_project_failures = Mock(
            return_value=expected
        )

        result = failure_memory_service.get_failures(
            db=db,
            project_id=20,
        )

        assert result == expected

        failure_memory_service.get_project_failures.assert_called_once_with(
            db,
            20,
        )

    finally:
        failure_memory_service.get_project_failures = original


# ============================================================
# CREATE FAILURE
# ============================================================

def test_create_failure():
    db = Mock()

    failure_data = Mock()

    failure_data.model_dump.return_value = {
        "project_id": 1,
        "failure_type": "technical",
        "failure_description": "Database failure",
    }

    result = failure_memory_service.create_failure(
        db=db,
        failure_data=failure_data,
    )

    failure_data.model_dump.assert_called_once_with()

    db.add.assert_called_once()

    created_failure = db.add.call_args.args[0]

    assert created_failure.project_id == 1
    assert created_failure.failure_type == "technical"
    assert created_failure.failure_description == "Database failure"

    db.commit.assert_called_once()
    db.refresh.assert_called_once_with(created_failure)

    assert result is created_failure


# ============================================================
# CREATE FAILURE MEMORY ALIAS
# ============================================================

def test_create_failure_memory_alias():
    db = Mock()
    failure_data = Mock()
    expected = Mock()

    original = failure_memory_service.create_failure

    try:
        failure_memory_service.create_failure = Mock(
            return_value=expected
        )

        result = failure_memory_service.create_failure_memory(
            db=db,
            failure_data=failure_data,
        )

        assert result is expected

        failure_memory_service.create_failure.assert_called_once_with(
            db,
            failure_data,
        )

    finally:
        failure_memory_service.create_failure = original


# ============================================================
# UPDATE FAILURE — MISSING
# ============================================================

def test_update_failure_returns_none_when_missing():
    db = Mock()

    original = failure_memory_service.get_failure

    try:
        failure_memory_service.get_failure = Mock(
            return_value=None
        )

        failure_data = Mock()

        result = failure_memory_service.update_failure(
            db=db,
            failure_id=999,
            failure_data=failure_data,
        )

        assert result is None

        db.commit.assert_not_called()
        db.refresh.assert_not_called()

    finally:
        failure_memory_service.get_failure = original


# ============================================================
# UPDATE FAILURE
# ============================================================

def test_update_failure():
    db = Mock()

    failure = Mock()

    failure_data = Mock()

    failure_data.model_dump.return_value = {
        "impact": "major",
        "resolution": "Configuration corrected",
    }

    original = failure_memory_service.get_failure

    try:
        failure_memory_service.get_failure = Mock(
            return_value=failure
        )

        result = failure_memory_service.update_failure(
            db=db,
            failure_id=1,
            failure_data=failure_data,
        )

        assert result is failure

        assert failure.impact == "major"
        assert failure.resolution == "Configuration corrected"

        failure_data.model_dump.assert_called_once_with(
            exclude_unset=True
        )

        db.commit.assert_called_once()
        db.refresh.assert_called_once_with(failure)

    finally:
        failure_memory_service.get_failure = original


# ============================================================
# UPDATE FAILURE MEMORY ALIAS
# ============================================================

def test_update_failure_memory_alias():
    db = Mock()

    failure_data = Mock()
    expected = Mock()

    original = failure_memory_service.update_failure

    try:
        failure_memory_service.update_failure = Mock(
            return_value=expected
        )

        result = failure_memory_service.update_failure_memory(
            db=db,
            failure_id=5,
            failure_data=failure_data,
        )

        assert result is expected

        failure_memory_service.update_failure.assert_called_once_with(
            db,
            5,
            failure_data,
        )

    finally:
        failure_memory_service.update_failure = original


# ============================================================
# DELETE FAILURE — MISSING
# ============================================================

def test_delete_failure_returns_none_when_missing():
    db = Mock()

    original = failure_memory_service.get_failure

    try:
        failure_memory_service.get_failure = Mock(
            return_value=None
        )

        result = failure_memory_service.delete_failure(
            db=db,
            failure_id=999,
        )

        assert result is None

        db.delete.assert_not_called()
        db.commit.assert_not_called()

    finally:
        failure_memory_service.get_failure = original


# ============================================================
# DELETE FAILURE
# ============================================================

def test_delete_failure():
    db = Mock()

    failure = Mock()

    original = failure_memory_service.get_failure

    try:
        failure_memory_service.get_failure = Mock(
            return_value=failure
        )

        result = failure_memory_service.delete_failure(
            db=db,
            failure_id=1,
        )

        assert result is failure

        db.delete.assert_called_once_with(
            failure
        )

        db.commit.assert_called_once()

    finally:
        failure_memory_service.get_failure = original


# ============================================================
# DELETE FAILURE MEMORY ALIAS
# ============================================================

def test_delete_failure_memory_alias():
    db = Mock()

    expected = Mock()

    original = failure_memory_service.delete_failure

    try:
        failure_memory_service.delete_failure = Mock(
            return_value=expected
        )

        result = failure_memory_service.delete_failure_memory(
            db=db,
            failure_id=7,
        )

        assert result is expected

        failure_memory_service.delete_failure.assert_called_once_with(
            db,
            7,
        )

    finally:
        failure_memory_service.delete_failure = original