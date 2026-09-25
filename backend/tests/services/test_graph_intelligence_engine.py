from types import SimpleNamespace
from unittest.mock import Mock, patch

from app.services.graph_intelligence_engine import (
    analyze_skill_network,
    analyze_student_network,
    analyze_project_network,
    analyze_opportunity_network,
    analyze_failure_network,
    analyze_opportunity_skill_gaps,
    generate_graph_intelligence,
)


# =========================================================
# SKILL NETWORK
# =========================================================

def test_analyze_skill_network():
    db = Mock()

    skills = [
        SimpleNamespace(id=1, name="Python"),
        SimpleNamespace(id=2, name="SQL"),
    ]

    db.query.return_value.all.return_value = skills

    db.query.return_value.filter.return_value.count.side_effect = [
        3, 2, 1,
        1, 1, 0,
    ]

    result = analyze_skill_network(db)

    assert len(result) == 2

    assert result[0]["skill_id"] == 1
    assert result[0]["skill_name"] == "Python"
    assert result[0]["student_count"] == 3
    assert result[0]["project_count"] == 2
    assert result[0]["opportunity_count"] == 1
    assert result[0]["connection_score"] == 6

    assert result[1]["skill_id"] == 2
    assert result[1]["connection_score"] == 2


def test_analyze_skill_network_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = analyze_skill_network(db)

    assert result == []


# =========================================================
# STUDENT NETWORK
# =========================================================

def test_analyze_student_network():
    db = Mock()

    students = [
        SimpleNamespace(id=1),
        SimpleNamespace(id=2),
    ]

    db.query.return_value.all.return_value = students

    db.query.return_value.filter.return_value.count.side_effect = [
        3, 2,
        1, 1,
    ]

    result = analyze_student_network(db)

    assert len(result) == 2

    assert result[0]["student_id"] == 1
    assert result[0]["skill_count"] == 3
    assert result[0]["project_count"] == 2
    assert result[0]["network_score"] == 12

    assert result[1]["student_id"] == 2
    assert result[1]["network_score"] == 5


def test_analyze_student_network_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = analyze_student_network(db)

    assert result == []


# =========================================================
# PROJECT NETWORK
# =========================================================

def test_analyze_project_network():
    db = Mock()

    projects = [
        SimpleNamespace(
            id=1,
            title="NEXUS",
        ),
        SimpleNamespace(
            id=2,
            title="Solar Tracker",
        ),
    ]

    db.query.return_value.all.return_value = projects

    db.query.return_value.filter.return_value.count.side_effect = [
        4, 3, 1,
        2, 1, 0,
    ]

    result = analyze_project_network(db)

    assert len(result) == 2

    assert result[0]["project_id"] == 1
    assert result[0]["project_title"] == "NEXUS"
    assert result[0]["skill_count"] == 4
    assert result[0]["member_count"] == 3
    assert result[0]["failure_count"] == 1
    assert result[0]["network_score"] == 15

    assert result[1]["project_id"] == 2
    assert result[1]["network_score"] == 6


def test_analyze_project_network_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = analyze_project_network(db)

    assert result == []


# =========================================================
# OPPORTUNITY NETWORK
# =========================================================

def test_analyze_opportunity_network():
    db = Mock()

    opportunities = [
        SimpleNamespace(
            id=1,
            title="AI Internship",
            organization="Company A",
            status="active",
        ),
    ]

    db.query.return_value.all.return_value = opportunities

    db.query.return_value.filter.return_value.count.return_value = 3

    result = analyze_opportunity_network(db)

    assert len(result) == 1

    assert result[0]["opportunity_id"] == 1
    assert result[0]["opportunity_title"] == "AI Internship"
    assert result[0]["organization"] == "Company A"
    assert result[0]["skill_count"] == 3
    assert result[0]["status"] == "active"
    assert result[0]["network_score"] == 3


def test_analyze_opportunity_network_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = analyze_opportunity_network(db)

    assert result == []


# =========================================================
# FAILURE NETWORK
# =========================================================

def test_analyze_failure_network():
    db = Mock()

    failures = [
        SimpleNamespace(
            id=1,
            failure_type="Deployment Failure",
            project_id=10,
        ),
        SimpleNamespace(
            id=2,
            failure_type="Deployment Failure",
            project_id=11,
        ),
        SimpleNamespace(
            id=3,
            failure_type="Database Failure",
            project_id=12,
        ),
    ]

    db.query.return_value.all.return_value = failures

    result = analyze_failure_network(db)

    assert len(result) == 2

    assert result[0]["failure_type"] == "Deployment Failure"
    assert result[0]["count"] == 2
    assert result[0]["projects"] == [10, 11]

    assert result[1]["failure_type"] == "Database Failure"
    assert result[1]["count"] == 1
    assert result[1]["projects"] == [12]


def test_analyze_failure_network_unknown_type():
    db = Mock()

    failures = [
        SimpleNamespace(
            id=1,
            failure_type=None,
            project_id=10,
        ),
    ]

    db.query.return_value.all.return_value = failures

    result = analyze_failure_network(db)

    assert result == [
        {
            "failure_type": "unknown",
            "count": 1,
            "projects": [10],
        }
    ]


def test_analyze_failure_network_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = analyze_failure_network(db)

    assert result == []


# =========================================================
# OPPORTUNITY SKILL GAPS
# =========================================================

def test_analyze_opportunity_skill_gaps():
    db = Mock()

    opportunities = [
        SimpleNamespace(
            id=1,
            title="AI Internship",
        ),
    ]

    required_skills = [
        SimpleNamespace(skill_id=10),
        SimpleNamespace(skill_id=20),
        SimpleNamespace(skill_id=30),
    ]

    first_query = Mock()
    first_query.all.return_value = opportunities

    second_query = Mock()
    second_query.filter.return_value.all.return_value = (
        required_skills
    )

    third_query = Mock()
    third_query.filter.return_value.count.side_effect = [
        5,
        0,
        0,
    ]

    db.query.side_effect = [
        first_query,
        second_query,
        third_query,
        third_query,
        third_query,
    ]

    result = analyze_opportunity_skill_gaps(db)

    assert len(result) == 1

    assert result[0]["opportunity_id"] == 1
    assert result[0]["opportunity_title"] == "AI Internship"
    assert result[0]["required_skill_count"] == 3
    assert result[0]["skill_gap_count"] == 2


def test_analyze_opportunity_skill_gaps_no_requirements():
    db = Mock()

    opportunities = [
        SimpleNamespace(
            id=1,
            title="General Internship",
        ),
    ]

    first_query = Mock()
    first_query.all.return_value = opportunities

    second_query = Mock()
    second_query.filter.return_value.all.return_value = []

    db.query.side_effect = [
        first_query,
        second_query,
    ]

    result = analyze_opportunity_skill_gaps(db)

    assert result == [
        {
            "opportunity_id": 1,
            "opportunity_title": "General Internship",
            "skill_gap_count": 0,
            "required_skill_count": 0,
        }
    ]


def test_analyze_opportunity_skill_gaps_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = analyze_opportunity_skill_gaps(db)

    assert result == []


# =========================================================
# COMPLETE GRAPH INTELLIGENCE
# =========================================================

def test_generate_graph_intelligence_structure():
    db = Mock()

    with (
        patch(
            "app.services.graph_intelligence_engine.analyze_skill_network",
            return_value=[{"skill_id": 1}],
        ),
        patch(
            "app.services.graph_intelligence_engine.analyze_student_network",
            return_value=[{"student_id": 1}],
        ),
        patch(
            "app.services.graph_intelligence_engine.analyze_project_network",
            return_value=[{"project_id": 1}],
        ),
        patch(
            "app.services.graph_intelligence_engine.analyze_opportunity_network",
            return_value=[{"opportunity_id": 1}],
        ),
        patch(
            "app.services.graph_intelligence_engine.analyze_failure_network",
            return_value=[{"failure_type": "test"}],
        ),
        patch(
            "app.services.graph_intelligence_engine.analyze_opportunity_skill_gaps",
            return_value=[{"opportunity_id": 1}],
        ),
    ):
        result = generate_graph_intelligence(db)

    assert result == {
        "skill_network": [{"skill_id": 1}],
        "student_network": [{"student_id": 1}],
        "project_network": [{"project_id": 1}],
        "opportunity_network": [{"opportunity_id": 1}],
        "failure_network": [
            {"failure_type": "test"}
        ],
        "opportunity_skill_gaps": [
            {"opportunity_id": 1}
        ],
    }