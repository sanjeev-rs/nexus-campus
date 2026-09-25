from unittest.mock import Mock

from app.services import project_dna_service


# ============================================================
# GET PROJECT DNA TESTS
# ============================================================

def test_get_project_dna_returns_none_for_missing_project():
    """
    Verify that a non-existent project returns None.
    """

    db = Mock()

    project_query = Mock()
    project_query.filter.return_value.first.return_value = None

    db.query.return_value = project_query

    result = project_dna_service.get_project_dna(
        db=db,
        project_id=999,
    )

    assert result is None


def test_get_project_dna_returns_complete_project_data():
    """
    Verify that Project DNA data contains the project,
    skills, members, outcomes, and evidence.
    """

    db = Mock()

    project = Mock()
    project.id = 1

    skills = [Mock(), Mock()]
    members = [Mock(), Mock(), Mock()]
    outcomes = [Mock()]
    evidence = [Mock(), Mock()]

    project_query = Mock()
    project_query.filter.return_value.first.return_value = project

    skills_query = Mock()
    skills_query.filter.return_value.all.return_value = skills

    members_query = Mock()
    members_query.filter.return_value.all.return_value = members

    outcomes_query = Mock()
    outcomes_query.filter.return_value.all.return_value = outcomes

    evidence_query = Mock()
    evidence_query.filter.return_value.all.return_value = evidence

    db.query.side_effect = [
        project_query,
        skills_query,
        members_query,
        outcomes_query,
        evidence_query,
    ]

    result = project_dna_service.get_project_dna(
        db=db,
        project_id=1,
    )

    assert result is not None

    assert result["project"] is project
    assert result["skills"] == skills
    assert result["members"] == members
    assert result["outcomes"] == outcomes
    assert result["evidence"] == evidence


# ============================================================
# INDIVIDUAL PROJECT DATA TESTS
# ============================================================

def test_get_project_skills():
    """
    Verify that project skills are retrieved correctly.
    """

    db = Mock()

    skills = [
        Mock(),
        Mock(),
        Mock(),
    ]

    query = Mock()
    query.filter.return_value.all.return_value = skills

    db.query.return_value = query

    result = project_dna_service.get_project_skills(
        db=db,
        project_id=10,
    )

    assert result == skills
    assert len(result) == 3


def test_get_project_members():
    """
    Verify that project members are retrieved correctly.
    """

    db = Mock()

    members = [
        Mock(),
        Mock(),
    ]

    query = Mock()
    query.filter.return_value.all.return_value = members

    db.query.return_value = query

    result = project_dna_service.get_project_members(
        db=db,
        project_id=10,
    )

    assert result == members
    assert len(result) == 2


def test_get_project_outcomes():
    """
    Verify that project outcomes are retrieved correctly.
    """

    db = Mock()

    outcomes = [
        Mock(),
        Mock(),
        Mock(),
    ]

    query = Mock()
    query.filter.return_value.all.return_value = outcomes

    db.query.return_value = query

    result = project_dna_service.get_project_outcomes(
        db=db,
        project_id=10,
    )

    assert result == outcomes
    assert len(result) == 3


def test_get_project_evidence():
    """
    Verify that project evidence is retrieved correctly.
    """

    db = Mock()

    evidence = [
        Mock(),
        Mock(),
    ]

    query = Mock()
    query.filter.return_value.all.return_value = evidence

    db.query.return_value = query

    result = project_dna_service.get_project_evidence(
        db=db,
        project_id=10,
    )

    assert result == evidence
    assert len(result) == 2


# ============================================================
# PROJECT DNA SUMMARY TESTS
# ============================================================

def test_get_project_dna_summary_returns_none_for_missing_project(
    monkeypatch,
):
    """
    Verify that the summary returns None when the project
    does not exist.
    """

    monkeypatch.setattr(
        project_dna_service,
        "get_project_dna",
        Mock(return_value=None),
    )

    result = project_dna_service.get_project_dna_summary(
        db=Mock(),
        project_id=999,
    )

    assert result is None


def test_get_project_dna_summary():
    """
    Verify that the Project DNA summary correctly counts
    skills, members, outcomes, and evidence.
    """

    project = Mock()

    mock_data = {
        "project": project,
        "skills": [
            Mock(),
            Mock(),
            Mock(),
        ],
        "members": [
            Mock(),
            Mock(),
        ],
        "outcomes": [
            Mock(),
            Mock(),
            Mock(),
            Mock(),
        ],
        "evidence": [
            Mock(),
        ],
    }

    monkeypatch = Mock()

    original_function = project_dna_service.get_project_dna

    try:
        project_dna_service.get_project_dna = Mock(
            return_value=mock_data
        )

        result = project_dna_service.get_project_dna_summary(
            db=Mock(),
            project_id=50,
        )

    finally:
        project_dna_service.get_project_dna = (
            original_function
        )

    assert result is not None

    assert result["project_id"] == 50
    assert result["skill_count"] == 3
    assert result["member_count"] == 2
    assert result["outcome_count"] == 4
    assert result["evidence_count"] == 1